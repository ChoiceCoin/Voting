/**
 * Hash Time Lock Smart Contract (HTLC)
 * @module hashtimelock
 */

module.exports = function () {
  // let's import the needed modules
  const algosdk = require('algosdk');
  const fs = require('fs').promises;
  const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
  const crypto = require('crypto');
  var randomWords = require('random-words');
  var algoutils = require("./algoutils");

  // constants to use for the Algod client
  const token = {
    'X-API-Key': `${process.env.API_KEY}`
  }

  const server = 'https://testnet-algorand.api.purestake.io/ps2';
  const port = '';

  /**
   * Creates a Hash Time Lock smart contract
   *
   * @memberof hashtimelock
   * @async
   * @param {string} contractOwner The wallet address of the contract owner
   * @param {string} contractReceiver The wallet address of the account that will 
   * receive the funds in the contract if they unlock it successfully
   * @returns {Array<String>} An array containing the address 
   * of the HTLC and the preimage
   */
  this.createHashTimeLockContract = async function (contractOwner, contractReceiver) {
    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);

    let txParams = await algodClient.getTransactionParams().do();

    // INPUTS
    let expiryRound = txParams.lastRound + parseInt(10000);
    let maxFee = 2000; // we set the max fee to avoid account bleed from excessive fees

    // generate the preimage and image
    let hashFn = "sha256";

    // generating an array of 8 random words (random-words is NOT CRYPTOGRAPHICALLY SECURE)
    console.log(`Generating an array of 8 random words to use as a passphrase...`);
    let strRandomWords = randomWords(8).join(' ');
    let hashImg = crypto.createHash(hashFn).update(strRandomWords).digest('base64');

    console.log(`Passphrase: ${strRandomWords}`);
    console.log(`SHA-256 hash (image): ${hashImg}`);

    console.log(`Creating hash time lock contract...`);
    let htlc = new htlcTemplate.HTLC(contractOwner, contractReceiver, hashFn, hashImg,
      expiryRound, maxFee);

    // store the TEAL program and the address of the contract
    let program = htlc.getProgram();
    let address = htlc.getAddress();

    // at this point you can write the contract to storage in order to reference it later
    // we're going to do that right now
    console.log(`Contract created at address ${address}.`);
    console.log(`Writing contract to file at static/contracts/${address}...`);

    try {
      await fs.access(`static/contracts/`);
    } catch (e) {
      await fs.mkdir(`static/contracts/`);
    }

    await fs.writeFile(`static/contracts/${address}`, program);

    return [address, strRandomWords];
  }

  /**
   * Unlocks an HTLC
   *
   * @memberof hashtimelock
   * @async
   * @param {string} contractAddress The address of the HTLC
   * @param {string} closeRemainderTo The wallet address of the account that will 
   * receive the funds in the contract if they unlock it successfully
   * @returns {string} The ID of the transaction that performed the unlock
   */
  this.unlockHashTimeLockContract = async function (contractAddress, closeRemainderTo,
    preimageBase64) {
    // read the TEAL program from local storage
    const data = await fs.readFile(`static/contracts/${contractAddress}`);
    let htlcProgram = data;

    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);
    let txParams = await algodClient.getTransactionParams().do();

    // create a transaction closing out the HTLC to the recipient
    // this will fail if the preimage isn't correct
    let txn = {
      "from": contractAddress,
      "to": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ", // zero account
      "fee": 1,
      "type": "pay",
      "amount": 0,
      "firstRound": txParams.firstRound,
      "lastRound": txParams.lastRound,
      "genesisID": txParams.genesisID,
      "genesisHash": txParams.genesisHash,
      "closeRemainderTo": closeRemainderTo
    };

    // Create logic signed transaction
    console.log(`Creating logic signature from hash image and HTLC program...`);
    let args = [Buffer.from(preimageBase64, 'base64').toString('ascii')];
    let lsig = algosdk.makeLogicSig(htlcProgram, args);
    let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

    //Submit the lsig signed transaction
    console.log(`Attempting to execute contract...`);
    let tx = (await algodClient.sendRawTransaction(rawSignedTxn.blob).do());
    await algoutils.waitForConfirmation(algodClient, tx.txId);
    console.log(`Execution transaction ID: ${tx.txId}`);

    return tx.txId;
  }
}
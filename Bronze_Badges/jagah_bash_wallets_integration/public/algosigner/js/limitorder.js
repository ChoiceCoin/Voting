/**
 * Limit Order Smart Contract
 * @module limitorder
 */

module.exports = function () {
  // let's import the needed modules
  const algosdk = require('algosdk');
  const fs = require('fs').promises;
  const limitTemplate = require("algosdk/src/logicTemplates/limitorder");
  var algoutils = require("./algoutils");

  // constants to use for the Algod client
  const token = {
    'X-API-Key': `${process.env.API_KEY}`
  }

  const server = 'https://testnet-algorand.api.purestake.io/ps2';
  const port = '';

  // private key mnemonic to reconstitute the account that owns the BUBBLE asset
  let bubblegumAccountMnemonic =
    "soft cloth blanket account dwarf title initial sweet retreat kiwi " +
    "minor maximum jaguar athlete excess sound ridge slow palm bid tackle " +
    "honey analyst absent clarify";

  /**
   * Creates a Limit Order smart contract
   *
   * @memberof limitorder
   * @async
   * @param {string} contractOwner The wallet address of the contract owner
   * @returns {string} The address of the created limit contract
   */
  this.createBubblegumLimitContract = async function (contractOwner) {
    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);

    let txParams = await algodClient.getTransactionParams().do();

    // INPUTS

    let ratn = parseInt(1); // 1 BUBBLE
    let ratd = parseInt(1000000); // for 1 Algo
    let assetID = 15431290; // ID of the BUBBLE asset
    let minTrade = 999999; // minimum number of microAlgos to accept
    let expiryRound = txParams.lastRound + parseInt(10000);
    let maxFee = 2000; // we set the max fee to avoid account bleed from excessive fees

    console.log(`Creating limit order contract...`);
    // create the limit contract template
    let limit = new limitTemplate.LimitOrder(contractOwner, assetID, ratn, ratd,
      expiryRound, minTrade, maxFee);

    // store the TEAL program and the address of the contract
    let program = limit.getProgram();
    let address = limit.getAddress();

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

    // next, we fund the contract account with the minimum amount of microAlgos required
    // this is 100,000 microAlgos (account minimum) plus two suggested fee amounts, one for
    // the contract funding transaction and one for the asset swap transaction
    // sender pays fee to send the required amount of Algos to the contract
    // so that's a total of 102,000 microAlgos

    console.log(`Reconstituting BUBBLE owner account from private key...`);
    let assetOwner = algosdk.mnemonicToSecretKey(bubblegumAccountMnemonic);

    console.log(`Funding contract with the minimum amount of µAlgos required...`);
    let note = algosdk.encodeObj("Contract funding transaction");
    let fundingTx = algosdk.makePaymentTxnWithSuggestedParams(assetOwner.addr,
      address, 100000 + (1000 * 2), undefined, note, txParams);
    let signedFundingTx = fundingTx.signTxn(assetOwner.sk);
    let resultTx = (await algodClient.sendRawTransaction(signedFundingTx).do());
    await algoutils.waitForConfirmation(algodClient, resultTx.txId);
    console.log(`Transaction confirmed. Funding transaction ID: ${resultTx.txId}`);

    // return the limit order's address on the blockchain
    return address;
  }

  /**
   * Executes a Limit Order smart contract
   *
   * @memberof limitorder
   * @async
   * @param {string} contractAddress The address of a limit contract
   * @returns {string} The ID of the transaction that performed the asset swap
   */
  this.executeBubblegumLimitContract = async function (contractAddress) {
    // read the TEAL program from local storage
    const data = await fs.readFile(`static/contracts/${contractAddress}`);
    let limitProgram = data;

    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);

    // set the proper amounts
    let assetAmount = parseInt(1);
    let microAlgoAmount = parseInt(1000000);

    let txParams = await algodClient.getTransactionParams().do();

    // swap 1 BUBBLE for 1,000,000 microAlgos (+fee)
    let assetOwner = algosdk.mnemonicToSecretKey(bubblegumAccountMnemonic);
    let secretKey = assetOwner.sk;

    console.log(`Attempting to execute contract...`);
    let txnBytes = limitTemplate.getSwapAssetsTransaction(limitProgram, assetAmount,
      microAlgoAmount, secretKey, txParams.fee, txParams.firstRound,
      txParams.lastRound, txParams.genesisHash);
    let tx = (await algodClient.sendRawTransaction(txnBytes).do());
    await algoutils.waitForConfirmation(algodClient, tx.txId);
    console.log(`Execution transaction ID: ${tx.txId}`);

    // return the transaction ID
    return tx.txId;
  }
}
/**
 * Split Contract
 * @module split
 */

module.exports = function () {
  // let's import the needed modules
  const algosdk = require('algosdk');
  const fs = require('fs').promises;
  const splitTemplate = require("algosdk/src/logicTemplates/split");
  var algoutils = require("./algoutils");

  // constants to use for the Algod client
  const token = {
    'X-API-Key': `${process.env.API_KEY}` // 'YOUR PURESTAKE API KEY HERE'
  }

  const server = 'https://testnet-algorand.api.purestake.io/ps2';
  const port = '';

  /**
   * Creates a Split smart contract
   *
   * @memberof split
   * @async
   * @param {string} sender The wallet address of the person sending the funds
   * @param {string} recipient1 The address of the person receiving the first portion
   * @param {string} ratio1 The ratio of funds for the person receiving the first portion
   * @param {string} recipient2 The address of the person receiving the second portion
   * @param {string} ratio2 The ratio of funds for the person receiving the second portion
   * @returns {string} The address of the created split contract
   * */
  this.createSplitContract = async function (sender, recipient1, ratio1,
    recipient2, ratio2) {
    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);

    let txParams = await algodClient.getTransactionParams().do();

    // INPUTS

    let receivers = [recipient1, recipient2];
    let ratn = parseInt(ratio1);
    let ratd = parseInt(ratio2);
    let expiryRound = txParams.lastRound + parseInt(10000);
    let minPay = 3000;
    let maxFee = 2000; // we set the max fee to avoid account bleed from excessive fees

    // create the split contract template
    console.log(`Creating split contract...`);
    let split = new splitTemplate.Split(sender, receivers[0], receivers[1], ratn, ratd,
      expiryRound, minPay, maxFee);

    // store the TEAL program and the address of the contract
    let program = split.getProgram();
    let address = split.getAddress();

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

    // return the split contract's address on the blockchain
    return address;
  }

  /**
   * Executes a Split smart contract
   *
   * @memberof split
   * @async
   * @param {string} contractAddress The address of a split contract
   * @param {string} amount The amount of microAlgos to be split
   * @returns {string} The ID of the transaction that performed the split
   */
  this.executeSplitContract = async function (contractAddress, amount) {
    // read the TEAL program from local storage
    const data = await fs.readFile(`static/contracts/${contractAddress}`);
    let splitProgram = data;

    // create the client
    let algodClient = new algosdk.Algodv2(token, server, port);

    let txParams = await algodClient.getTransactionParams().do();

    let txnBytes = splitTemplate.getSplitFundsTransaction(splitProgram, amount,
      txParams.firstRound, txParams.lastRound, txParams.fee, txParams.genesisHash);

    console.log(`Attempting to execute contract...`);
    let tx = (await algodClient.sendRawTransaction(txnBytes).do());
    await algoutils.waitForConfirmation(algodClient, tx.txId);
    console.log(`Execution transaction ID: ${tx.txId}`);

    // return the transaction ID
    return tx.txId;
  }
}
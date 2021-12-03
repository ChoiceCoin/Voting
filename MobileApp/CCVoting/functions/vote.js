const algosdk = require("algosdk"); //imports algosdk

export function vote (decision) {


const algosdk = require("algosdk"); //imports algosdk



const baseServer = "https://testnet-algorand.api.purestake.io/ps2"; //define Purestake.io server
const port = "";
const token = {
  "X-API-Key": "", //Input Purestake.io Api key here
};
const algodClient = new algosdk.Algodv2(token, baseServer, port); //creates new instance of algosdk

const asset_id = 21364625; 
const escrow = ""; //Put address two private key here
const address_one="";  //Put address one private key here
const address_zero=""  //Put address zero private key here

const amount = 100; 

const address_two_phrase = algosdk.mnemonicToSecretKey(" "); //Put address two Mnemonic Phrase here

const params = algodClient.getTransactionParams().do(); //get transaction params


   
if (decision === 0) {
    //Draft Asset Transfer Transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:escrow,
      to:address_zero,
      amount:amount,
      assetIndex:asset_id,
      suggestedParams:{
        note: "Sent to address zero",
        type: "axfer", // ASA Transfer (axfer)
        fee: params.fee,
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
        flatFee: params.flatFee,
      }
  });

   // Sign transaction with the address two secret key
    const signedTxn = txn.signTxn(address_two_phrase.sk);
    //send signed transaction
     const result = algodClient.sendRawTransaction(signedTxn).do();

     res=`Sent to address zero, Your Transaction ID: ${result.txId}`;
  } else if(decision === 1){
    //Draft Asset Transfer transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:escrow,
      to:address_one,
      amount:amount,
      assetIndex:asset_id,
      suggestedParams:{
        note: "Sent to address One",
        type: "axfer", // ASA Transfer (axfer)
        fee: params.fee,
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
        flatFee: params.flatFee,
      }
  });

   // sign transaction with address two secretkey
    const signedTxn = txn.signTxn(address_two_phrase.sk);
    //Send signed Transaction
     const result = algodClient.sendRawTransaction(signedTxn).do();

    
     res=`Sent to address One, Your Transaction ID: ${result.txId}`;
     
  }
  return res;
    }
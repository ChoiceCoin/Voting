var express = require("express");
var app = express();
const algosdk = require("algosdk"); //imports algosdk

const baseServer = "https://testnet-algorand.api.purestake.io/ps2"; //define Purestake.io server
const port = "";
const token = {
  "X-API-Key": "iSusnJg4L15ucSz2c73tq3HS5hitxZY71ye84MVh", //Input Purestake.io Api key here
};
const algodClient = new algosdk.Algodv2(token, baseServer, port); //creates new instance of algosdk

const asset_id = 21364625; 
const escrow = ""; //Put address two private key here
const address_one="";  //Put address one private key here
const address_zero=""  //Put address zero private key here
const mne = ''//mmemonic keys here
const amount = 100; 


var txnParams

const { sk: skmkeystwo } = algosdk.mnemonicToSecretKey(mne);

async function go(){
     //initiating a Transaction
 txnParams = await algodClient.getTransactionParams().do();


}

go()
 
app.listen(process.env.PORT || 3000, () => {
 console.log("Server running on port 3000");
});


app.get("/vote1", (req, res, next) => {

  console.log(req)
  const txnNote = algosdk.encodeObj({ message: req.query.id});


    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        escrow,//sending address
        address_zero,//receiving address
        undefined,
        undefined,
        amount,//amount to be transfered --------------- 100 is 1 choice
        txnNote,//transaction note
        asset_id,// asset asa id on the network
        txnParams
      );

      const signedTxn = txn.signTxn(skmkeystwo);//secret key from mmemonics to give approval. ;-)
      const txnResponse = algodClient
        .sendRawTransaction(signedTxn)
        .do();

        //feedback ------
      res.send(`1 CHOICE sent from addressTwo to address zero \nTransaction ID: ${txn
          .txID()
          .toString()}`)

            



})
  
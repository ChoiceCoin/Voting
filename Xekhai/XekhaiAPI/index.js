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
const escrow = ""; //Put address two
const address_one="";  //Put address one
const address_zero=""  //Put address zero

let addr = ''
const mne = ''
const amount = 100;


var txnParams

const { sk: skmkeystwo } = algosdk.mnemonicToSecretKey(mne);

async function go(){
  //initiating a Transaction
  txnParams = await algodClient.getTransactionParams().do();

}

go()

const balanceFormatter = (amount, assetId) => {
  const asset_info = algodClient.getAssetByID(assetId);
  const decimals = asset_info["params"]["decimals"];
  const unit = asset_info["params"]["unit-name"];
  const formatted_amount = amount / 10 ** decimals;
  return `${formatted_amount} ${unit}`;
};


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});


app.get("/vote", (req, res, next) => {


  const txnNote = algosdk.encodeObj({ message: Date.now()});

  if(req.query.id == 1){
    addr = address_one
  }else if (req.query.id == 2){
    addr = address_zero
  }else(
      res.send('Bad Vote')
  )

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      escrow,//sending address
      addr,//receiving address
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
  res.send(`${txn
      .txID()
      .toString()}`)





})


app.get("/count",(req,res, next) =>{

  let assets

  let tot1
  let tot2

  async function go(){
    const address = address_one;
    const accountInfo = await algodClient.accountInformation(address).do();
    assets = await accountInfo["assets"];
  }
  go().then(()=>{
        for (let i = 0; i < assets.length; i++) {
          if (assets[i]['asset-id'] == asset_id){
            console.log(assets[i].amount)
            tot1 = assets[i].amount
          }
        }
      }
  ).finally(()=>{

    async function go2(){
      const address = address_zero;
      const accountInfo = await algodClient.accountInformation(address).do();
      assets = await accountInfo["assets"];
    }
    go2().then(()=>{
      for (let i = 0; i < assets.length; i++) {
        if (assets[i]['asset-id'] == asset_id){
          console.log(assets[i].amount)
          tot2 = assets[i].amount
        }
      }
    }).finally(()=>{
      res.send(`${tot1},${tot2}`)

    })

  })

})
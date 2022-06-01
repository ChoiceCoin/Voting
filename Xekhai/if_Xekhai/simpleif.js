//import requirements
const algosdk = require("algosdk");
const inquirer = require("inquirer");


/////////////////////////////////////////////////////////////////
//Set Configuration Values for the PureStake API
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
//
//leave port blank unless using localserver as baseserver.
const port = "";
//
//enter your purestake api key in X-API-Key
const token = {
  "X-API-Key": "",
};

//Create the Client
const algodClient = new algosdk.Algodv2(token, baseServer, port);
/////////////////////////////////////////////////////////////////


//asset to be transfered asa id.
const assetID = 21364625;
//choice testnet is being used in this example



//adresses
//adresses two needs to be adequately funded
//all addresses needs to opt to asa assetID above
const addressone = ''
const addresstwo = ''
const addresszero = ''

//Mnemonics for address two since its the only one we need to transfer from
const mkeystwo = ''
//covert mnemonic To SecretKey
const { sk: skmkeystwo } = algosdk.mnemonicToSecretKey(mkeystwo);


//inquirer to prompt for input and handle logic
inquirer
    .prompt([{ message: "Please enter a number [0,1]:", name: "number" }])//prompt
    .then(async (answers) => {

      //get response
      const response = answers.number;

      //encode transaction note
      const txnNote = algosdk.encodeObj({ message: "Bonus transfer task" });

      //initiating a Transaction
      const txnParams = await algodClient.getTransactionParams().do();

      if (response === "0") {
          //making the transaction here
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          addresstwo,//sending address
          addresszero,//receiving address
          undefined,
          undefined,
          100,//amount to be transfered --------------- 100 is 1 choice
          txnNote,//transaction note
          assetID,// asset asa id on the network
          txnParams
        );

        const signedTxn = txn.signTxn(skmkeystwo);//secret key from mmemonics to give approval. ;-)
        const txnResponse = await algodClient
          .sendRawTransaction(signedTxn)
          .do();

          //feedback ------
        console.log(`1 CHOICE sent from addressTwo to address zero \nTransaction ID: ${txn
            .txID()
            .toString()}`
        );
      }  else if (response === "1") {
        //making the transaction here
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            addresstwo,//sending address
            addressone,//receiving address
            undefined,
            undefined,
            100,//amount to be transfered ------------- 100 is 1 choice
            txnNote,//transaction note
            assetID,// asset asa id on the network
            txnParams
          );
  
          const signedTxn = txn.signTxn(skmkeystwo);//secret key from mmemonics to give approval. ;-)
          const txnResponse = await algodClient
            .sendRawTransaction(signedTxn)
            .do();

          //feedback ------
          console.log(`1 CHOICE sent from addressTwo to addressone \nTransaction ID: ${txn
              .txID()
              .toString()}`
          );

    } 
    })//detect and show errors
    .catch((error) => {
        console.log("An error occured");
        console.log(error);
    });
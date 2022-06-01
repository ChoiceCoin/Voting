/*
The Bronze Bonus Bash for Choice Coin 
Issue: https://github.com/ChoiceCoin/Voting/issues/933
Run: npm install
*/

async function Vote() {
    let choice = document.getElementsByName("decision");
    let txid = document.getElementById("txnid");
  let alert = document.getElementById("alert");

    for (let i = 0; i<choice.length; i++){
        if (choice[i].checked){
            let value = choice[i].value; // gets the clicked item
            let response = await send(value); // sends transaction
            txnid.innerHTML += `TxnID: ${response}`; //shows transaction id on page
            alert.classList.add("alert");
        }
    }
}



const baseServer = "https://testnet-algorand.api.purestake.io/ps2"; //define Purestake.io server
const port = "";
const token = {
  "X-API-Key": "", //Input Purestake.io Api key here
};
const algodclient = new algosdk.Algodv2(token, baseServer, port); //creates new instance of algosdk

const asset_id = 21364625; 

const button_address = ""; //Put address two private key here
const blue_address="";  //Put address one private key here
const red_address=""  //Put address zero private key here

const amount = 100; 


const button_address_phrase = algosdk.mnemonicToSecretKey(""); //Put address two Mnemonic Phrase here

 

async function send(input){
  const user_input = input;
  
  const params = await algodclient.getTransactionParams().do(); //get transaction params
  
  if (user_input == "red") {
    //Draft Asset Transfer Transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:button_address,
      to:red_address,
      amount:amount,
      assetIndex:asset_id,
      suggestedParams:{
        note: "Sent to red address",
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
    const signedTxn = txn.signTxn(button_address_phrase.sk);
    //send signed transaction
    const result = await algodclient.sendRawTransaction(signedTxn).do();

    return result.txId

  } else if(user_input == "blue"){
    //Draft Asset Transfer transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:button_address,
      to:blue_address,
      amount:amount,
      assetIndex:asset_id,
      suggestedParams:{
        note: "Sent to blue address",
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
    const signedTxn = txn.signTxn(button_address_phrase.sk);
    //Send signed Transaction
    const result = await algodclient.sendRawTransaction(signedTxn).do();

    
    return result.txId;
      
  }
};


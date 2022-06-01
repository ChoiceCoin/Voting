
const redInput = document.getElementById("red"); // get the red checkbox
const blueInput = document.getElementById("blue"); //get the blue checkbox
const button = document.getElementById("button") // get button

let value = ""

const Vote = () => {
    // check if redinput is clicked
if(redInput.checked) {
    value = redInput.value
     sendToken(value) //send token
    console.log(value);
}
// check if blue input is clicked
if(blueInput.checked) {
    value = blueInput.value
    sendToken(value) //send token
    console.log(value);
}

   
}

const server = "https://testnet-algorand.api.purestake.io/ps2"; //Purestake.io server
const port = "";
const token = {
  "X-API-Key": "", //Your Purestake.io Api key here
};
const algodclient = new algosdk.Algodv2(token, server, port); //creates new instance of algosdk

const asset_id = 21364625; 

const button_address = ""; //enter button address private key here
const blue_address="";  //enter blue address private key here
const red_address=""  //enter red address private key here

const amount = 100; 


const button_mmemonic = algosdk.mnemonicToSecretKey(""); //Put button address Mnemonic Phrase here



const sendToken = async (value) =>{

  const params = await algodclient.getTransactionParams().do(); //get transaction params

  if (value == "red") {
    //asset Transfer Transaction details
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:button_address,
      to:red_address,
      amount:amount,
      assetIndex:asset_id,
     params : params
  });

    // Sign transaction with button memmonic key
    const signedTxn = txn.signTxn(button_mmemonic.sk);
    //return signed transaction
    const result = await algodclient.sendRawTransaction(signedTxn).do();

    return alert(result.txId)

  } else if(value == "blue"){
    //Asset transfer transaction details
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from:button_address,
      to:blue_address,
      amount:amount,
      assetIndex:asset_id,
      params : params
  });

    // Sign transaction with button memmonic key
    const signedTxn = txn.signTxn(button_mmemonic.sk);
    //return signed Transaction with alert
    const result = await algodclient.sendRawTransaction(signedTxn).do();


    return alert(result.txId);
    

  }
};

button.addEventListener("click", Vote);





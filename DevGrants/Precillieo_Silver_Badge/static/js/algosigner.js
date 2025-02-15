//Import Algosdk via CDN
import "https://cdn.jsdelivr.net/npm/algosdk@1.12.0/dist/browser/algosdk.min.js";
//Import algowallet function from the algowallet js file in the static/js folder
import { algowallet } from "./algowallet.js"




//Configure all dropdowns of header, popups after signing transactions by getting classes from the index.html file.
let optionDropdown = document.querySelector(".dd-menu");
let optionButton = document.querySelector(".dd-button");
let alertPopup = document.querySelector(".alert");
let alertBox= document.querySelector(".alert-box");


//Set the variable for user's address
var wallet_address= "";


// Function that get triggered after "Cast Vote" is clicked. It selects either algosigner or algowallet function based on the connection
window.castVote = function (){
    if(optionButton.innerHTML.toLowerCase().includes("algosigner")) {
        window.algosigner()
    }
    else if (optionButton.innerHTML.toLowerCase().includes("algowallet")) {
       window.algowallet()
        
    }
    else {
        //Wallet not connected Popup
        alertPopup.style.display= "flex";
        alertBox.textContent = "Wallet Not Connected";
    }

}


// Function thar connects to AlgoSigner. It fetches user's addresses.
window.connectToAlgoSigner = function () {
  AlgoSigner.connect()
    .then(() =>
      AlgoSigner.accounts({
        ledger: "TestNet",
      })
    )
    .then((accountData) => {
      wallet_address = accountData[0].address  
      console.log(accountData);
      //Address drop down implementation
      optionButton.innerText = "Algosigner Connected";
       optionDropdown.innerHTML = ''
      accountData.forEach((account) => {
         const listItem = document.createElement("li");
        listItem.innerHTML = account.address;
        optionDropdown.appendChild(listItem);
      });
    })
    .catch((e) => {

        console.error(e)
    })
};



//Configure the imported algosdk for signing transactions. Pass in your own API key.
const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "P4UEmiWKTQ5rNTp2kA73m8rjxqx6fI7M9vuLghhF"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

//Set the zero and one addresses
const zero_address= "F7NMTMC5X63DDZVV7HCB2VJCUIBHOXOYVB46MZJOM6OLCH47VFN7DA7RAY";
const one_address = "OTSL5T72IEISWQKKAJ75Z3M2HOEQKUQC2AGK2VNZSHZKXU6JAAJNE5KKXI";

//Set the choice asset id
const CHOICE_ID = 21364625;

//Get user's input from form
const yesOption = document.getElementById("yes");
const noOption = document.getElementById("no");



//Function that activates another function to sign transactions based on user's input.
window.algosigner = async () => {
    if (yesOption.checked) {
        let val= yesOption.value
        let res =await algoSignerSendTransaction(val, wallet_address);
        if (res) {
            //Pop up for confirmation. It displays transaction ID.
            alertPopup.style.display= "flex";
            alertBox.textContent = `Thank you for voting for Zero. Signed transaction with txID:${res.txId}`;
        };
    }
    if (noOption.checked) {
        let val= noOption.value
        let res= await algoSignerSendTransaction(val, wallet_address);
        if (res) {
            //Popup for confirmation. It displays transaction ID.
            alertPopup.style.display= "flex";
            alertBox.textContent = `Thank you for voting for One. Signed transaction with txID:${res.txId}`;
        };
    }
}



// This function does the transaction signing.
const algoSignerSendTransaction = async (val, wallet_address) => {
    //Get params from algodclient. Encode text note. Get user's input (amount) from form
    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
    const amount = parseInt(document.getElementById("amount").value)
    //const amount= (parseInt(document.getElementById("amount").value) / 100)

    if (val == "yes") {
        try {
            let txn= await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                zero_address,
                undefined,
                undefined,
                amount,
                encoder.encode("Is Choice Coin the best"),
                CHOICE_ID,
                params
                );
            //Sign and send transaction. Pick Testnet accounts. And return the ID.
            const txn_base64= AlgoSigner.encoding.msgpackToBase64(txn.toByte());
            let signedTxn= await AlgoSigner.signTxn([{txn: txn_base64}]);
            let sendTxn = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTxn[0].blob
            });

            let txId = txn.txID().toString();
            return sendTxn;

        } catch(error){
            console.error(error);
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                one_address,
                undefined,
                undefined,
                amount,
                encoder.encode("Is Choice Coin the best"),
                CHOICE_ID,
                params
                );
            //Sign and send transaction. Pick Testnet accounts. And return the ID.
            const txn_base64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());            
            let signedTxn =  await AlgoSigner.signTxn([{txn: txn_base64}]);
            let sendTxn = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTxn[0].blob
            });

            let txId = txn.txID().toString();
            return sendTxn;

        } catch(error){
            console.error(error);
        }

    }
}
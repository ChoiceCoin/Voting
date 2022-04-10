//import randlabs/myalgo-connect module from CDN
import MyAlgoConnect from 'https://cdn.skypack.dev/@randlabs/myalgo-connect';


//Configure all dropdowns of header, popups after signing transactions by getting classes from the index.html file.
let optionDropdown = document.querySelector(".dd-menu");
let optionButton = document.querySelector(".dd-button");
let alertPopup = document.querySelector(".alert");
let alertBox= document.querySelector(".alert-box");


//Activate the imported module
const Algo = new MyAlgoConnect();
//Set the variable for user's address
var wallet_address= "";


// Function thar connects to AlgoWallet. It fetches user's addresses.
window.connectToMyAlgoWallet = function () {
	Algo.connect()
	.then((accounts) => {
        wallet_address= accounts[0].address
        console.log(accounts)
        optionButton.innerText = "Algowallet Connected";
	})
	.catch((err) => {
		console.log(err)
	})
}



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
window.algowallet = async () => {
    if (yesOption.checked) {
        let val= yesOption.value
        let res =await algoWalletSendTransaction(val, wallet_address);
        if (res) {
             //Pop up for confirmation. It displays transaction ID.
            alertPopup.style.display= "flex";
            alertBox.textContent = `Thank you for voting for Zero. Signed transaction with txID:${res.txId}`;
        };
    }
    if (noOption.checked) {
        let val= noOption.value
        let res= await algoWalletSendTransaction(val, wallet_address);
        if (res) {
             //Pop up for confirmation. It displays transaction ID.
            alertPopup.style.display= "flex";
            alertBox.textContent = `Thank you for voting for One. Signed transaction with txID:${res.txId}`;
        };
    }
}



// This function does the transaction signing.
const algoWalletSendTransaction = async (val, wallet_address) => {
    //Get params from algodclient. Encode text note. Get user's input (amount) from form
    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
    const amount = parseInt(document.getElementById("amount").value)
    //const amount= (parseInt(document.getElementById("amount").value) / 100)

    if (val == "yes"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
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
            const signedTxn = await Algo.signTransaction(txn.toByte());
            const res = await algodclient.sendRawTransaction(signedTxn.blob).do();
            let txId = txn.txID().toString();
            return res;
            
        }catch(error){
            console.log(error);
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
            const signedTxn = await Algo.signTransaction(txn.toByte());
            const res = await algodclient.sendRawTransaction(signedTxn.blob).do();
            let txId = txn.txID().toString();
            return res;
        }catch(error){
            console.log(error);
        }

    }

}

//Export the algowallet function. To be assessed by the algosigner js file.
export function algowallet() {}
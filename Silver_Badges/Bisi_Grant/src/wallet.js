const Host = "https://testnet-algorand.api.purestake.io/ps2";
const Puretoken = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const Port = "";
const algodClient = new algosdk.Algodv2(Puretoken, Host, Port);

const address_1 = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI"; 
const address_2 = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";

let red = document.getElementById("red"); // get the red checkbox
let blue = document.getElementById("blue"); //get the blue checkbox

// let input = document.getElementsByTagName("input");

const result = document.getElementById("result") //get result from HTML Element
const resultDiv = document.getElementById("results"); //get result div




const ASSET_ID = 21364625;




const myAlgoConnect = new MyAlgoConnect();

const myAlgoWalletConnect = async () => {

    try {
        let response = await myAlgoConnect.connect();
        console.log(response.name);
        if(response) {
            resultDiv.hidden = false
            result.textContent= ` Welcome ${response[0].name}, Address: ${response[0].address}.`
             
        }
        
    } catch (error){
        console.error(error)
    }
};

const myAlgoWalletSign = async () =>{
    
    
     // check if redinput is clicked
     if(red.checked) {
        let value = red.value
        console.log(value)
        let wallet_address = document.getElementById("wallet").value; //get wallet address
        let  redChoiceAmount = Number(document.getElementById("red-input").value) //get amount
        let response = await algoWalletSend(value, wallet_address, redChoiceAmount);
        if (response){
            result.textContent= `Your transactionID : ${response}` //transaction response
         }

        }
        else {
      // check if blue input is clicked
      if(blue.checked) {
          let value = blue.value
          let wallet_address = document.getElementById("wallet").value; //get wallet address
          let blueChoiceAmount = Number(document.getElementById("blue-input").value) //get amount
          console.log(blueChoiceAmount)
        let response = await algoWalletSend(value, wallet_address, blueChoiceAmount);
                if (response){
                    result.textContent= `Your transactionID : ${response}`
                };
        }    
            
    }
}
    



const algoWalletSend = async (value, wallet_address, amount) => {
    

    let params = await algodClient.getTransactionParams().do(); //get params
    let encoder = new TextEncoder();  //encode
    if (value == "red"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_1,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            result.textContent = error
            console.log(error);
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_2,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            result.textContent = error
            console.log(error);
        }

    }

}




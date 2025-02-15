const Host = "https://testnet-algorand.api.purestake.io/ps2";
const Puretoken = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const Port = "";
const algodClient = new algosdk.Algodv2(Puretoken, Host, Port);

const address_1 = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI"; 
const address_2 = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";

const indexerClient = new algosdk.Indexer(Puretoken,"https://testnet-algorand.api.purestake.io/idx2",Port)

let red = document.getElementById("red"); // get the red checkbox
let blue = document.getElementById("blue"); //get the blue checkbox

// let input = document.getElementsByTagName("input");

const result = document.getElementById("result") //get result from HTML Element
const resultDiv = document.getElementById("results"); //get result div

const address = document.getElementById("address");
const connectAddress = document.getElementById("connect");
const choice_commited = document.getElementById("choice");
const button  = document.getElementById("button")




const ASSET_ID = 21364625;



let respons;
const myAlgoConnect = new MyAlgoConnect();

const myAlgoWalletConnect = async () => {

    try {
        let response = await myAlgoConnect.connect();
        console.log(response);
        if(response) {
            let resp = response[0].address.substring(0, 22)
            let res = response[0].address.substring(0, 17)
             respons = response[0].address
            address.textContent= `${resp}...`
             connectAddress.textContent = `${res}...`
         let rate = 10;
        let history = await indexerClient.searchForTransactions().address(response[0].address).assetID(ASSET_ID).limit(rate).do()
        let totalCoin = 0;
        history["transactions"].forEach(data=>{
            totalCoin += data["asset-transfer-transaction"]["amount"]/100
        });
        choice_commited.textContent = `${totalCoin}`
             
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
        let  redChoiceAmount = Number(document.getElementById("choice-amount").value) //get amount
        let response = await algoWalletSend(value, respons, redChoiceAmount);
        if (response){
            console.log(response);
            if(!respons) {
                alert("connect your account to vote");
            }
            // result.textContent= `Your transactionID : ${response}` //transaction response
         }

        }
        else {
      // check if blue input is clicked
      if(blue.checked) {
          let value = blue.value
          let blueChoiceAmount = Number(document.getElementById("choice-amount").value) //get amount
          console.log(blueChoiceAmount)
          
        let response = await algoWalletSend(value, respons, blueChoiceAmount);
        if(!respons) {
            alert("connect your account to vote");
        }
                if (response){
                    console.log(response);
                    alert(response);
                    // result.textContent= `Your transactionID : ${response}`
                };
        }    
            
    }
}
    



const algoWalletSend = async (value, wallet_address, amount) => {
    

    let params = await algodClient.getTransactionParams().do(); //get params
    let encoder = new TextEncoder();  //encode
    if (value == "one"){
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
            console.log(error);
        }

    }

}

const check = () => {
    if (respons) {
        myAlgoWalletSign()
    }
    else {
        algosigner()
    }
}

button.addEventListener("click", check);




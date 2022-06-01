const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;

const address_one = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI";
const address_two = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";

const redInput = document.getElementById("red"); // get the red checkbox
const blueInput = document.getElementById("blue"); //get the blue checkbox

const results = document.getElementById("result") //get result from HTML Element
const resultsDiv = document.getElementById("results"); //get result div



const  connectToAlgoSigner = async () => {
    let response = await AlgoSigner.connect();
    console.log("My Algosigner Connected");
    if(response) {
        resultsDiv.hidden = false
        results.textContent= ` Welcome ${response[0].name}, Algosigner is connected.`
        setTimeout(() => {
         window.location.href = "/algosigner";
        }, 1000)
         
    }
};

const algosigner = async () => {
    

   // check if redinput is clicked
        if(redInput.checked) {
            const wallet = document.getElementById("wallet").value; //get wallet value
            let value = redInput.value
            let  redAmount = Number(document.getElementById("red-input").value) //get red choice amount
            let response =  await algoSignerSendTransaction(value, wallet, redAmount);
            if (response){
                results.textContent= `Your transactionID : ${response}` //transaction response
             };
            console.log(value);
        }
        // check if blue input is clicked
        if(blueInput.checked) {
            const wallet = document.getElementById("wallet").value; //get wallet value
            let value = blueInput.value
            let  blueAmount = Number(document.getElementById("blue-input").value) //get blue choice amount
            let response = await algoSignerSendTransaction(value, wallet, blueAmount);
                    if (response){
                        results.textContent= `Your transactionID : ${response}` //transaction response
                    };
        }
            
}


const algoSignerSendTransaction = async (value, wallet, amount) => {
    
    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
          
    
    if (value == "red"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet,
                address_1,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
             );
            // Use the AlgoSigner encoding library to make the transactions base64
            const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                
            let signedTxn =  await AlgoSigner.signTxn([{txn: txn_b64}]);
        
            let sendTxn = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTxn[0].blob
            });
        
            return sendTxn;
        }catch(error){
            results.textContent = error
            console.log(error);
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet,
                address_2,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                
            let signedTxn =  await AlgoSigner.signTxn([{txn: txn_b64}]);
        
            let sendTxn = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTxn[0].blob
            });
        
            return sendTxn;
        }catch(error){
            results.textContent = error
            console.log(error);
        }

    }

}

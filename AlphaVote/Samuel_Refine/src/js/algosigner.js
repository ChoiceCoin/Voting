const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;
const indexerclient = new algosdk.Indexer(token,"https://testnet-algorand.api.purestake.io/idx2",port)

const address_one = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI";
const address_two = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";


const results = document.getElementById("result") //get result from HTML Element
const resultsDiv = document.getElementById("results"); //get result div


let responses;

const  connectToAlgoSigner = () => {
    // let response = await AlgoSigner.connect();
    // console.log("My Algosigner Connected");
    // console.log(response)
   
    if(typeof AlgoSigner !== 'undefined') {
        // connects to the browser AlgoSigner instance
         AlgoSigner.connect()
        // finds the TestNet accounts currently in AlgoSigner
        .then(() => AlgoSigner.accounts({
            ledger: 'MainNet' || 'TestNet'
        }))
        .then((accountData) => {
            // the accountData object should contain the Algorand addresses from TestNet that AlgoSigner currently knows about
            console.log(accountData);
            let resp = accountData[0].address.substring(0, 22)
            let res = accountData[0].address.substring(0, 17)
            responses= accountData[0].address
            address.textContent= `${resp}...`
            connectAddress.textContent = `${res}...`

        let rate = 10;
        let history = indexerclient.searchForTransactions().address(accountData[0].address).assetID(ASSET_ID).limit(rate).do()
        let totalCoin = 0;
        setTimeout(() => {
            history["transactions"].forEach(data=>{
                totalCoin += data["asset-transfer-transaction"]["amount"]/100
            });

            choice_commited.textContent = `${totalCoin}`
        }, 2000);
    
        
             
        })
        .catch((e) => {
            // handle errors and perform error cleanup here
            console.error(e);
        }

        )
    } 
        
    // if(response) {
    //      console.log(response);
    //     // resultsDiv.hidden = false
    //     // results.textContent= ` Welcome ${response[0].name}, Algosigner is connected.`
         
    //}

}

const algosigner = async () => {
    

   // check if redinput is clicked
        if(red.checked) {
            let value = red.value
            let  redAmount = Number(document.getElementById("choice-amount").value) //get red choice amount
            let response =  await algoSignerSendTransaction(value, responses, redAmount);
            if(!responses) {
                alert("you have to connect your wallet to vote")
            }
            if (response){
                // results.textContent= `Your transactionID : ${response}` //transaction response
                console.log(response)
             };
            console.log(value);
        }
        // check if blue input is clicked
        if(blue.checked) {
            // const wallet = document.getElementById("wallet").value; //get wallet value
            let value = blue.value
            let  blueAmount = Number(document.getElementById("choice-amount").value) //get blue choice amount
            if(!responses) {
                alert("you have to connect your wallet to vote")
            }
            let response = await algoSignerSendTransaction(value, responses, blueAmount);
                    if (response){
                        // results.textContent= `Your transactionID : ${response}` //transaction response
                        console.log(response)
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
            // results.textContent = error
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
            // results.textContent = error
            console.log(error);
        }

    }

}

// button.addEventListener("click", algosigner);
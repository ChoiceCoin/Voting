const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "VrtWc9n3cp19bjPikB4kj5365gsfOfqS55sRO39t"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;

const address_one = "FG226M4M3APS5MPDZ43CUBAMQAQD6D36PIQDOJSLAY2KP4QUX5RFCQ4WCA";
const address_two = "Z5HQKJNJ7E5DF2V6TYWKL2CSW2ICVEFUHK4CQHPWNPIY7SSFHORP7PYD5M";


async function Connect () {
    let response = await AlgoSigner.connect();
    window.location.href = "/algosigner/vote"
};

async function Algosigner() {
    let from = document.getElementById("wallet-address").value;
    for (let i =0; i<decision.length; i++){
        if (decision[i].checked){
            let value = decision[i].value;
            try {
                    let response = await AlgoSignerSend(value, from);
                    if (response){
                       window.location.href = "/";
                    };
            }
            catch (error) {
                console.error(error);
            }
        }
    }


}


async function AlgoSignerSend(input, from){

    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
          
    
    if (input == "one"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                from,
                address_1,
                undefined,
                undefined,
                100,
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
            console.error(error);
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                from,
                address_2,
                undefined,
                undefined,
                100,
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
            console.error(error);
        }

    }

}


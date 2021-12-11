const host = "https://testnet-algorand.api.purestake.io/ps2";
const tokenID = {
    "X-API-Key": "VrtWc9n3cp19bjPikB4kj5365gsfOfqS55sRO39t"
}
const portNumber = "";
const algodClient = new algosdk.Algodv2(tokenID, host, portNumber);

const address_1 = "FG226M4M3APS5MPDZ43CUBAMQAQD6D36PIQDOJSLAY2KP4QUX5RFCQ4WCA";
const address_2 = "Z5HQKJNJ7E5DF2V6TYWKL2CSW2ICVEFUHK4CQHPWNPIY7SSFHORP7PYD5M";

let decision = document.getElementsByName("decision");

const ASSET_ID = 21364625;

const myAlgoConnect = new MyAlgoConnect();

async function myAlgoWalletConnect () {

    try {
        let response = await myAlgoConnect.connect();
        console.log(response);
        window.location.href = "/algow/vote";
    } catch (error){
        console.error(error)
    }
};

async function myAlgoWalletSign(){
    let from = document.getElementById("wallet-address").value;
    for (let i =0; i<decision.length; i++){
        if (decision[i].checked){
            let value = decision[i].value;
            try {
                    let response = await send(value, from);
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

async function send(input, from){
    let params = await algodClient.getTransactionParams().do();
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
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algoClient.sendRawTransaction(signedTxn.blob).do();
            return response;
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
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            console.error(error);
        }

    }

}



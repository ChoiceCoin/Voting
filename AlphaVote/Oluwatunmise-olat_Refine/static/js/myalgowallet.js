const host = "https://testnet-algorand.api.purestake.io/ps2";
const tokenID = {
    "X-API-Key": "<api key>"
}
const portNumber = "";
const algodClient = new algosdk.Algodv2(tokenID, host, portNumber);

const address_1 = "<wallet address>";
const address_2 = "<wallet address>";

const indexerClient = new algosdk.Indexer(tokenID, "https://testnet-algorand.api.purestake.io/idx2", portNumber);



const ASSET_ID = 21364625;

const myAlgoConnect = new MyAlgoConnect();

const walletbtn = document.getElementById("walletbtn");
const coin_in_gov_btn = document.getElementById("total_gov_coin");
let decision = document.getElementsByName("poll");


async function Connect () {
    try {
        let response = await myAlgoConnect.connect();
        const {address, name} = response[0];
        walletbtn.innerHTML = `${name.toUpperCase()} ${address}`
        walletbtn.setAttribute("onClick", "WalletAssets()");
        let rate = 10;
        let history = await indexerClient.searchForTransactions().address(address).assetID(ASSET_ID).limit(rate).do()
        let totalCoin = 0;
        history["transactions"].forEach(data=>{
            totalCoin += data["asset-transfer-transaction"]["amount"] /100
        });
        coin_in_gov_btn.innerHTML += `
            You have sent ${totalCoin} choice coin over the past ${rate} transactions for governance
        `;
        coin_in_gov_btn.classList.add("show");
    } catch (error){
        console.error(error)
    }
};

const assetsbtn = document.getElementById("assets");

async function WalletAssets() {
    const address = walletbtn.innerHTML.split(" ")[1].trim();
    let assets = await algodClient.accountInformation(address).do();
    let choice_balance = "";
    let assetsAvailable = assets["assets"];
    let algo_amount = assets["amount"] * 0.000001;
    for (let i = 0; i < assetsAvailable.length; i++){
        if (assetsAvailable[i]["asset-id"] == ASSET_ID){
            choice_balance = assetsAvailable[i]["amount"]/100
        }
    };
    assetsbtn.innerHTML = `
        Asset : ALGO Balance: ${algo_amount}  
        <br/>
        Asset :CHOICE Balance: ${choice_balance}
    `;
    assetsbtn.classList.add("show");

};

const errorButton = document.getElementById("error");

function Toggler () {
    assetsbtn.classList.toggle("show");
}

async function myAlgoWalletSign(){
    let from = document.getElementById("wallet-address").value;
    for (let i =0; i<decision.length; i++){
        if (decision[i].checked){
            let value = decision[i].value;
            let from = walletbtn.innerHTML.split(" ")[1].trim();
            let amount = parseInt(document.getElementById("wallet-address").value);
            if (!from){
                errorButton.classList.toggle("error_show");
                errorButton.innerHTML += "You have to connect your account"
            }
            else {
                try {
                        let response = await send(value, from, amount);
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

}


async function send(input, from, amount){
    let params = await algodClient.getTransactionParams().do();
    let encoder = new TextEncoder();
    if (input == "one"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                from,
                address_1,
                undefined,
                undefined,
                amount * 100,
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

    else if (input == "two") {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                from,
                address_2,
                undefined,
                undefined,
                amount * 100,
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
    else {};
}

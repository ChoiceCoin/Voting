
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const ASSET_ID = 21364625;

const token = {
    'X-API-key': '6HrMYd5r3C59gsCd1zHip5JgDDVwGTAu61L8wQ28',
}

let algodClient = new algosdk.Algodv2(token, baseServer, port);



// Function used to wait for a tx confirmation
const waitForConfirmation = async function (txId) {
    let response = await algodClient.status().do();
    let lastround = response["last-round"];
    while (true) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
            //Got the completed Transaction
            console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            break;
        }
        lastround++;
        await algodClient.statusAfterBlock(lastround).do();
    }
};




const sendChoice = async (connection, sender, receiver) => {
    params = await algodClient.getTransactionParams().do();
    const txn = {
        ...params,
        type: 'axfer',
        from: sender,
        to: receiver,
        assetIndex: ASSET_ID,
        amount: 100,
        note: "Voting"
    };
    const signedTxn = await connection.signTransaction(txn);
    console.log(signedTxn)
    await algodClient.sendRawTransaction(signedTxn.blob).do();
    await waitForConfirmation(signedTxn.txID)
}
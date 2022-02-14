const algosdk = require('algosdk');
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";

const token = {
    'X-API-key': 'nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1',
}

let algodClient = new algosdk.Algodv2(token, baseServer, port);

(async () => {

    let params = await algodClient.getTransactionParams().do();

    let amount = Math.floor(Math.random() * 1000);
    var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint";
    var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

    let txn = {
        "from": recoveredAccount.addr,
        "to": "UUOB7ZC2IEE4A7JO4WY4TXKXWDFNATM43TL73IZRAFIFFOE6ORPKC7Q62E",
        "fee": 1,
        "amount": amount,
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(0),
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction : " + sendTx.txId);
})().catch(e => {
    console.log(e);
}); 
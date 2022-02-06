// import algosdk
const algosdk = require('algosdk');

const server = process.env.server;
const port = process.env.port;
const token = process.env.token;

// instantiate the algorand client
const algodclient = new algosdk.Algodv2(token, server, port);

// Function for generating wallet
function generateWallet() {
    var account = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(account.sk);
    return { account, mnemonic }
}

// Function for sending payment transaction
function sendPaymentTransaction(mnemonic, to, amount) {
    var p = new Promise(function (resolve) {
        let account = algosdk.mnemonicToSecretKey(mnemonic);
        // use closeRemainderTo paramerter when you want to close an account
        let closeRemainderTo = undefined;
        // use note parameter when you want to attach a string to the transaction
        let note = undefined;
        algodclient.getTransactionParams().do().then((params) => {
            let txn = algosdk.makePaymentTxnWithSuggestedParams(account.addr, to, amount, closeRemainderTo, note, params);
            // sign the transaction
            var signedTxn = algosdk.signTransaction(txn, account.sk);
            algodclient.sendRawTransaction(signedTxn.blob).do().then((tx) => {
                waitForConfirmation(algodclient, tx.txId)
                    .then(resolve )
                    .catch(console.log('goood state'));
            }).catch(console.log('badd'));
        }).catch(console.log('helpppp'));
    })
    return p;
}

// Utility function to wait for tx confirmaiton
function waitForConfirmation(algodclient, txId) {
    var p = new Promise(function (resolve, reject) {
        console.log("Waiting transaction: " + txId + " to be confirmed...");
        var counter = 1000;
        let interval = setInterval(() => {
            if (--counter === 0) reject("Confirmation Timeout");
            algodclient.pendingTransactionInformation(txId).do().then((pendingInfo) => {
                if (pendingInfo !== undefined) {
                    let confirmedRound = pendingInfo["confirmed-round"];
                    if (confirmedRound !== null && confirmedRound > 0) {
                        clearInterval(interval);
                        resolve("Transaction confirmed in round " + confirmedRound);
                    }
                }
            }).catch(reject);
        }, 2000);
    });
    return p;
}

module.exports = {
    waitForConfirmation,
    generateWallet,
    sendPaymentTransaction
}
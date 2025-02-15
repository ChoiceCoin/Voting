const algosdk = require("algosdk");
const inquirer = require("inquirer");

//  Constants to be able to interact with the algorand blockchain
const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": ""
}

// default port used by the algosdk is 443 so we can leave it blank 
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

// Choice assset id to be opted in
const CHOICE_ASSET_ID = 21364625;


// SENDER
// sends choice depending on user input
const address_two = "";
const address_two_mnemonic = "";
const address_two_hash = algosdk.mnemonicToSecretKey(address_two_mnemonic);


// RECIEVERS
// receives choice depending on user input
const address_one = "";
const address_zero = "";

// List of Questions to ask the user
const Question = [
    {
        name: "result",
        choices: [0, 1],
        message: "Please enter 0 or 1"  
    },
]

// Get users answer from the terminal
async function vote() {
    // invokes inquirer(a command line utility tool) to get user input
    let response = await inquirer.prompt(Question);

    // Here we get the users inputted value
    const { result } = response;
    
    switch (parseInt(result)){
        // handles case the user entered 1
        case 1:
            // we call the transaction function to transfer choice from address two to address one
            await Transactions(address_one);
            break;
        // handles case the user entered 0
        case 0:
            // we call the transaction function to transfer choice from address two to address zero
            await Transactions(address_zero);
            break;
        // handles case the user didnt enter either of 0 or 1
        default:
            console.log("Not a Valid Response");
    }
}

// Create Transfer Transaction from one account to the other
async function Transactions (receiver_address) {
    // here we perform the sending of assets
    // by default address two is the sender in all cases
    
    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        address_two,
        receiver_address,
        undefined,
        undefined,
        100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ASSET_ID,
        params
    );
    
    // here we sign the transaction
    let signedTxn = txn.signTxn(address_two_hash.sk);
    // get the transaction id 
    let txId = txn.txID().toString();
    console.log(`Signed Transaction with TXID: ${txId}`)
    
    // here we send the actual transaction to the blockchain
    try {
        const sendTxn = await algodclient.sendRawTransaction(signedTxn).do();
        // we wait for certain time to be sure the transaction as been broadcasted on the blockchain network
        let confirmedTxn = await waitForConfirmation(algodclient, txId, 4);
    } catch(error){
        let response = error.response;
        console.log(error);
        console.log({
            status_code: response.status,
            message: JSON.parse(response.text).message
        })
        return undefined;
    }
}

// here we create a function for the transaction to be broadcasted
// we verify that the transaction has moved from the pending state to confirmed state
async function waitForConfirmation (algodclient, txid, timeout) {
    if (algodclient == null || txid == null || timeout < 0) {
        throw new Error("Invalid arguments provided");
    }

    const status = await algodclient.status().do();
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txid).do();
        if (pendingInfo !== undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            } else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction " + txid + " rejected - pool error: " + pendingInfo["pool-error"]);
                }
            }
        }
        await algodclient.statusAfterBlock(currentround).do();
        currentround++;
    }
    throw new Error("Transaction " + txid + " not confirmed after " + timeout + " rounds!");
};


vote();


// TXID IF USER CHOOSE 1: EPPDFHKEEY7U6BOVEKOW3MNVAUNTXF2J4GKG7FBE6RGRBPXPUTKA
// TXID IF USER CHOOSE 0: F75LEA523E253G7PWP2YDTDTVN2AOOBFE3MTWGLYATQP7FISAXDQ
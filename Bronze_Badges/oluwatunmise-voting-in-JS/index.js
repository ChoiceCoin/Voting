// Requirements
const algosdk = require("algosdk");
const inquirer = require("inquirer");

const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": ""
}

const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;

// VOTER CREDENTIALS
const voting_user_address = "";
const voting_user_mnemonic = "";
const voting_user_hash = algosdk.mnemonicToSecretKey(voting_user_mnemonic);

// POSTS <DECISIONS> CREDENTIALS
const presidential_candidate_1_address = "";
const presidential_candidate_2_address = "";


Transactions;
CheckResults;
Winner;
waitForConfirmation;


// VOTE FUNCTIONALITY
function vote () {
    inquirer
    .prompt([
        {
            name: 'president',
            message: 'choose either 1 for <PDP> as presidential party or 2 for <APC> as presidential party'
        },
    ])
    .then(async (answers) => {
        console.log("Processing ...");
        
        if (answers.president == 1){
            try {
                let makeTransaction = await Transactions (presidential_candidate_1_address, voting_user_address, voting_user_hash);
            } catch(error){
                console.error({
                    error
                });
            }
        }
        else if (answers.president == 2) {
            try {
                let makeTransaction = await Transactions (presidential_candidate_2_address, voting_user_address, voting_user_hash);
            } catch(error){
                console.error({
                    error
                });
            }
        }
        else {
            console.log("Not a valid choice");
            return undefined;
        };
        finalResult();
    })
};

vote();


// CREATE ASSET TRANSFER TRANSACTION
async function Transactions (receiver, sender_address, sender_hash) {
    let params = await algodclient.getTransactionParams().do();
    let encoder = new TextEncoder();
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender_address,
        receiver,
        undefined,
        undefined,
        100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ASSET_ID,
        params
    );
    
    let signedTxn = txn.signTxn(sender_hash.sk);
    let txId = txn.txID().toString();
    console.log(`Signed Transaction with ${txId}`)
    
    try {
        const sendTxn = await algodclient.sendRawTransaction(signedTxn).do();
        let confirmedTxn = await waitForConfirmation(algodclient, txId, 4);
        console.log(`Transaction ${txId} is confirmed: ${confirmedTxn["confirmed-round"]}`)
    } catch(error){
        let response = error.response;
        console.log(error);
        console.log({
            status_code: response.status,
            message: JSON.parse(response.text).message
        })
        return undefined;
    }
    
    console.log("Thanks for voting");

}


// GETS THE AMOUNT OF ASSET FOR A PARTICLUAR ADDRESS
async function CheckResults (address) {
    const accountInfo = await algodclient.accountInformation(address).do();
    const assets = await accountInfo["assets"];
    for (let asset of assets) {
        if (asset["asset-id"] === CHOICE_ASSET_ID) {
            const amount = asset["amount"]/100;
            console.log(
                `Account ${address} has amount has ${amount}`
            );
            return amount;
        }
    }
    console.log(`Account ${address} must opt in to Asset ID ${CHOICE_ASSET_ID}`);
}


// GETS THE WINNER IN AN ARRAY OF UNIQUE DECISION E.G VOTING FOR PRESIDENT
async function Winner(array){

    let highest_count = 0;
    let highest_count_address = "";
    // let ties = [];
    
    let data = {
        winner_details: {
            address: "",
            amount: ""
        }
    }
    let lastElem = array[array.length - 1];

    
    
    for (let elm_address of array){
        let result = await CheckResults(elm_address);
        if (result > highest_count) {
            highest_count = result;
            highest_count_address = elm_address;
            
            data["winner_details"]["address"] = highest_count_address;
            data["winner_details"]["amount"] = highest_count;
        }
        if (elm_address == lastElem) {
            return data;
        }
    }
    
}
    
let finalResult = async () =>  {
    let response = await Winner([presidential_candidate_1_address, presidential_candidate_2_address]);
    console.log(response);
};

// WAITS FOR TRANSACTION TO BE BROADCASTED
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

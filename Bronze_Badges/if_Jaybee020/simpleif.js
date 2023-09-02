const algosdk=require('algosdk');
const prompt=require('prompt');


//This helps in connecting the algoClient with the algorand network
const algoServer='https://testnet-algorand.api.purestake.io/ps2'
const algoPort='';
const token = {
    'X-API-Key': 'YOUR API KEY HERE'
 }
let algoalgoClient = new algosdk.Algodv2(token, algoServer, algoPort);
// Set the variables for voting using Choice Coin and for the specific voter's Algorand address.
const CHOICE_ASSET_ID = 21364625;
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);



//receives and validates input values 
const main=async function(){
    try {
        const choice_per_vote=1;//this constant can be changed 
        const address_two=""//wallet address of sender
        const address_two_mnemonic=""//25 word pattern of address of sender
        const address_one=""//address of candidate 
        const address_zero=""//address of other candidate 
        const escrow_key = algosdk.mnemonicToSecretKey(address_two_mnemonic)['sk'];//generating the secret key from the 25 word pattern
        console.log("Enter 0 or 1 for the option you wanna vote for")
        prompt.start()
        const voter_input=await prompt.get('voter_input')//getting users input
        console.log(voter_input)
        let enc=new TextEncoder()
            const note=enc.encode("Voting using Choice Coin")
        if(Number(voter_input.voter_input)==0){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(address_two,address_zero,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params)//Sending the specified asset to the address zero
            let signedtxn=txn.signTxn(escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            console.log("Signed transaction with txID: %s", txId);
        }else if (Number(voter_input.voter_input)==1){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(address_two,address_one,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params) //Sending the specified asset to the address zero
            let signedtxn=txn.signTxn(escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            console.log("Signed transaction with txID: %s", txId);
        }else{
            console.log("Invalid input")
        }
        
    } catch (error) {
            console.log(error)
    }
}


//Function to await confirmation results from blockchain
const waitForConfirmation = async function (algodalgoClient, txId, timeout) {
    if (algodalgoClient == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
    }

    const status = (await algodalgoClient.status().do());
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodalgoClient.pendingTransactionInformation(txId).do();
        if (pendingInfo !== undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            } else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
                }
            }
        }
        await algodalgoClient.statusAfterBlock(currentround).do();
        currentround++;
    }

    throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");
}

main()
//if input is 0 result was Signed transaction with txID: E7G3KNJYO6LUEXEISD3HJHMHJDWUBW463WHL5HRQAEOPHXQZERNA
//if input is 1 result was Signed transaction with txID: BWMZNJVQIJGBIMIYRPHNMAJ37YT3SSVOZ5JWHNSIYNLJHV6TJKNQ
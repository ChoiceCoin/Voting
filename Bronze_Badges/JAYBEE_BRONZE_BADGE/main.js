//importing the neccessary dependencies
const algosdk=require('algosdk');


// Set the variables for voting using Choice Coin and for the specific voter's Algorand address.
const CHOICE_ASSET_ID = 21364625;
// const voter_address = "";//
// const voter_phrase = algosdk.mnemonicToSecretKey("").sk;
    
async function has_choice(address,client){
    try {
        let assets=await client.accountInformation(address).do()['assets'];
        console.log(assets)
        contains_choice=false
        // console.log(assets)
        for(let i;i++;i<assets.length){
            if(assets[i]['asset-id']==CHOICE_ASSET_ID){
                contains_choice==true;

            }
        }
        return contains_choice
    } catch (error){
        console.log(error)
    }
}

async function get_balance(address,client){
    try {
        let account_balance=await client.accountInformation(address).do()['amount']
        return account_balance
    } catch (error) {
        console.log(error)
    }
    
}

async function get_choice_balance(address,client){
    try {
        let account=await client.accountInformation(address).do()   
        // console.log(account)
        let assets_owned=account['assets']
        assets_owned.forEach(asset=>{
            if(asset['asset-id']==CHOICE_ASSET_ID){
                return asset['amount']
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function validate_address(address,mnemonic,client,CPV,participants){
    try {
        if (!algosdk.isValidAddress(address)){
            return{
                'status':false,
                'message':"Invalid Wallet Address"
            }
        }
        if(algosdk.mnemonicToSecretKey(mnemonic).addr!=address){
            return{
                'status':false,
                'message':"Wallet and Mnemonic ker do not match"
            }
        }
        if(!has_choice(address,client)){
            return{
                'status':false,
                'message':"No choice in wallet"
            }
        }if(get_balance(address,client)<=1.3*1000000*participants){
            return{
                'status':false,
                'message':"Not enough balance to process all votes"
            }
        }if(get_choice_balance(address,client)<=1.2*CPV*participants){
            return{
                'status':false,
                'message':"Not enough balance to process all votes"
            }
        }
        return{
            'status':true,
            'message':"Address Valid"
        }
        
    } catch (error) {
        console.log(error)
    }
   
}



/**
 * @param {Number} amount - Account to receive funds
 * @param {string} receiver_address - Account to receive funds
 * @param {string} escrow_address -   Account to send funds
 *  @param {string} escrow_key -   secret key of escrow wallet
 */
async function fund_Address(amount,receiver_address,escrow_address,escrow_key,client){
    try {
        const params=await client.getTransactionParams().do();  
        params.fee=100
        let enc=new TextEncoder()
        const note=enc.encode("Initial Funding")
        const txn=algosdk.makePaymentTxnWithSuggestedParams(escrow_address,receiver_address,amount,undefined,note,params)
        let txId = txn.txID().toString();
        const signedtxn=txn.signTxn(escrow_key);
        console.log("Signed transaction with txID: %s", txId);
        // Submit the transaction
        await client.sendRawTransaction(signedtxn).do()
        console.log("submit")

        // Wait for confirmation
        let confirmedTxn = await waitForConfirmation(client, txId,4);
        if(confirmedTxn){
            console.log("funded")
            return true
    }
    } catch (error) {
        console.log(error)
    }
}

async function join_choice(private_key,address,client){
    try {
        const params=await client.getTransactionParams().do();
        let enc=new TextEncoder()
        const note=enc.encode("Join Choice Wallet")
        let is_choice=await has_choice(address,client)
        if(!is_choice){
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(address,address,undefined,undefined,0,note,CHOICE_ASSET_ID,params)
            let txId = txn.txID().toString();
            let signedtxn=txn.signTxn(private_key)
            await client.sendRawTransaction(signedtxn).do()
        // Wait for confirmation
            let confirmedTxn = await waitForConfirmation(client, txId,4);
            if(confirmedTxn){
                console.log("Joined Choice")
                return true
            }
    }
    } catch(error){
        console.log(error)
    }
    
}

async function create_candidates_address(secret_key,address,client,candidates){
    try {
        const initial_amount=1000000;
        const options_array=[]
        for(let i=0;i<candidates.length;i++){
            let account= algosdk.generateAccount();
            let gen_address=account['addr'];
            let gen_key=account['sk']
            const is_funded=await fund_Address(initial_amount,gen_address,address,secret_key,client)
            if (!is_funded){
                return{
                    'status':false,
                    'message':"Funding Failed"
                }
            }
            const joined_choice=await join_choice(gen_key,gen_address,client)
            if(!joined_choice){
                return{
                    'status':false,
                    'message':"Unable to have Choice Wallet"
                }
            }
            options_array.push({
                'candidate':candidates[i],
                'address':gen_address
            })
        }
        return options_array;

    } catch (error) {
        console.log(error)
    }
}


async function vote(private_key,address,options_array,voter_inputs,client,choice_per_vote){
    try {
        const params=await client.getTransactionParams().do();
        params.fee=100
        if((voter_inputs<1)|| voter_inputs>options_array.length){
            return{
                'status':false,
                'message':"Enter valid selection number"
            }
        }
        let candidate_voted=options_array[voter_inputs-1];
        let enc=new TextEncoder()
        const note=enc.encode("Voting using Choice Coin")
        let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(address,candidate_voted['address'],undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params)
        let signedtxn=txn.signTxn(private_key)
        await client.sendRawTransaction(signedtxn).do()
        // Wait for confirmation
        let txId = txn.txID().toString();
        let confirmedTxn = await waitForConfirmation(client, txId,4);
        if(confirmedTxn){
            console.log("Voted")
            return{
                'status':true,
                'message':`Successfuly voted for ${candidate_voted['candidate']} with address  ${candidate_voted['address']} with id ${txId}`
            }
        }
        return{
            'status':false,
            'message':"Voting failed"
        }    
    } catch (error) {
        console.log(error)
    }
   
}

const waitForConfirmation = async function (algodClient, txId, timeout) {
    if (algodClient == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
    }

    const status = (await algodClient.status().do());
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
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
        await algodClient.statusAfterBlock(currentround).do();
        currentround++;
    }

    throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");
}


//calculates the votes of each of options 
async function calculate_votes(options_array,client){
    try {
        let results=[]
        for(let i=0;i<options_array.length;i++){
            let option=options_array[i]
            let account=await client.accountInformation(option['address']).do()
            // console.log(account)
            let assets_owned=account['assets'] 
            assets_owned.forEach((asset)=>{
                if(asset['asset-id']==CHOICE_ASSET_ID){
                    let amount=asset['amount']
                    results.push({
                        'option':option['candidate'],
                        'amount':amount,
                        'address':option['address']
                    })
                    // console.log(amount)
                }
                // console.log(results)
            })
        }
    return results
    } catch (error) {
        console.log(error)
    }
}



//sorting the list by ammount
function find_winner(vote_array){
    const winner=vote_array.sort(function(a,b){
       b['amount']-a['amount']
   })
   return winner
}

module.exports={validate_address,create_candidates_address,vote,calculate_votes,find_winner}

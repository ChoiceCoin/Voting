//importing the neccesary modules
const express=require("express")
const app=express()
const algosdk=require('algosdk');
//This helps in connecting the client with the algorand network
const algoServer='https://testnet-algorand.api.purestake.io/ps2'
const algoPort='';
const token = {
    'X-API-Key': ''//Your APi key here
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
const CHOICE_ASSET_ID = 21364625;



const main_address=""//address goes here
const main_mnemonic=""//25 word pattern goes here


//function to validate wallet address and menemonic
async function validatewallet(address,mnemonic){
    try {
        if(!algosdk.isValidAddress(address)){
            return{
                'status':false,
                'message':"Invalid Wallet Address"
            }
        }
        if(algosdk.mnemonicToSecretKey(mnemonic).addr!=address){
            return{
                'status':false,
                'message':"Wallet and Mnemonic key do not match"
            }
        }
        return{
            'status':true,
        }
    } catch (error) {
        console.log(error)
    }
}

async function rekeytosingle(address,mnemonic,new_wallet=undefined){
    try {
        const is_valid=await validatewallet(address,mnemonic)
        if(!is_valid['status']){
            return is_valid['message']
        }
        var account=undefined
        if(!new_wallet){
            account=algosdk.generateAccount()//generate a new account with a private key for rekeying
        }
        const params=await algoClient.getTransactionParams().do()//getting transaction parameters
        let enc=new TextEncoder()
        const note=enc.encode("Rekey")
        const newkey_account=new_wallet['addr']||account['addr']
        let txn=algosdk.makePaymentTxnWithSuggestedParams(address,address,0,undefined,note,params,newkey_account)//creating the rekey transaction
        console.log(txn)
        const main_key=algosdk.mnemonicToSecretKey(mnemonic)['sk']
        let signedTxn= txn.signTxn(main_key)
        await algoClient.sendRawTransaction(signedTxn).do()
        let txnId=txn.txID().toString()
        console.log(txnId)
        let confirmedTxn=await waitForConfirmation(algoClient,txn.txID(),5)  
        var mnemonics=undefined
        if(!new_wallet){
            mnemonics=sig_accounts.map(account=>algosdk.secretKeyToMnemonic(account['sk']))
        }
        return {
            'sk':account['sk'],
            'mnemonic':mnemonics||account['mnemonic']
        }
    } catch (error) {
        console.log("Rekeying Failed")
        console.log(error)
    }
    
}

async function rekeytomultisig(address,mnemonic,no_of_accounts,accounts=undefined){
    try {
        const is_valid=await validatewallet(address,mnemonic)
        if(!is_valid['status']){
            return is_valid['message']
        }
        if(!accounts){
            const gen_sig_accounts=[]
            for(let i=0;i<no_of_accounts;i++){
                let account=algosdk.generateAccount()
                gen_sig_accounts.push(account)
            }
        }
        const sig_accounts=accounts||gen_sig_accounts
        const multi_sig_params={
            version:1,
            threshold:1,//change this to alter the amount of accounts to sign a transaction
            addrs:sig_accounts.map(account=>account.addr)
        }

        let multi_sig_addr=algosdk.multisigAddress(multi_sig_params)
        const params=await algoClient.getTransactionParams().do()//getting transaction parameters
        let enc=new TextEncoder()
        const note=enc.encode("Rekey Multi")
        let txn=algosdk.makePaymentTxnWithSuggestedParams(address,address,0,undefined,note,params,multi_sig_addr)//creating the rekey transaction
        console.log(txn)
        const main_key=algosdk.mnemonicToSecretKey(mnemonic)['sk']
        let signedTxn= txn.signTxn(main_key)
        await algoClient.sendRawTransaction(signedTxn).do()
        let txnId=txn.txID().toString()
        console.log(txnId)
        let confirmedTxn=await waitForConfirmation(algoClient,txn.txID(),5)  
        console.log(sig_accounts)
        var mnemonics=undefined
        if(!accounts){
            mnemonics=sig_accounts.map(account=>algosdk.secretKeyToMnemonic(account['sk']))
        }
        return {
            'sk':sig_accounts.map(account=>account['sk']),
            'mnemonic':sig_accounts.map(account=>mnemonics||account['mnemonic'])
        }
    } catch (error) {
        console.log("Rekeying Failed")
        console.log(error)
    }
}


//function to see effect of rekeying (notice in auth address property)
async function check(address){
    let account=await algoClient.accountInformation(address).do()
    console.log(account)
}



//enter respective public addresses and 
// rekeytomultisig(main_address,main_mnemonic,0,[
//     {
//       addr: '',
//       sk:'hello'},
//     {
//       addr: '',
//       sk:''
//     },
//     {
//       addr: '',
//       sk:'',}
   
//   ]
//   )
check(main_address)//check effects 


//wait for confirmation 
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
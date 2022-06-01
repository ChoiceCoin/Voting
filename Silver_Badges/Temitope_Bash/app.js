//importing the neccesary modules
const express=require("express")
const app=express()
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const algosdk=require('algosdk');

//This helps in connecting the client with the algorand network
const algoServer='https://testnet-algorand.api.purestake.io/ps2'
const algoPort='';
const token = {
    'X-API-Key': 'Your api key'
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
const indexerClient = new algosdk.Indexer(token, "https://testnet-algorand.api.purestake.io/idx2", algoPort);
const CHOICE_ASSET_ID = 21364625;

const button_address=""//wallet address of sender
const button_mnemonic=""//25 word pattern of address of sender
const red_address=""//address of candidate 1
const red_mnemonic=""//This 25 word pattern would be needed to enable the candidate able refund the choice to the voter.
const blue_address=""//address of candidate 2
const blue_mnemonic=""//This 25 word pattern would be needed to enable the candidate able refund the choice to the voter.
const escrow_key = algosdk.mnemonicToSecretKey(button_mnemonic)['sk'];//generating the secret key from the 25 word pattern
const red_escrow_key = algosdk.mnemonicToSecretKey(red_mnemonic)['sk'];//generating the secret key from the 25 word pattern
const blue_escrow_key = algosdk.mnemonicToSecretKey(blue_mnemonic)['sk'];//generating the secret key from the 25 word pattern
app.use(express.static(__dirname+"/public"))//setting the public directory you want to use




app.get("/",function(req,res){
    res.render("vote.ejs")
})

app.get("/voting_history",async function(req,res){
    try {
    let obj_array=[]
    //getting the last 20 transaction history of the given address that involved transfer of the chosen asset id
    let history=await indexerClient.searchForTransactions().address(button_address).assetID(CHOICE_ASSET_ID).limit(20).do()
    const transactions_history=history['transactions']
    //loop to check if the receiver was red_address or blue address
    transactions_history.forEach((element)=>{
        const transaction=element['asset-transfer-transaction']
        if(transaction['receiver']==red_address){
            obj={
                'candidate':'Red','address':red_address,'Id':element['id'],'amount':transaction['amount']
            }
            obj_array.push(obj)
        }else if(transaction['receiver']==blue_address){
            obj={
                'candidate':'Blue','address':blue_address,'Id':element['id'],'amount':transaction['amount']
            }
            obj_array.push(obj) 
        }
    })
    res.render("vote_history.ejs",{results:obj_array})//passing this obj array to the the rendered front end
    } catch (error) {
        console.log(error)
    }
})


//withdrawal of votes simply involves sending the initial amount of choice sent back to the escrow wallet
app.get("/withdraw/:receiver/:amount",async function(req,res){
    try {
        var receiver=req.params.receiver//getting who to refund the choice coin from
        var amount=Number(req.params.amount) //getting the amount to send back
        if(receiver=='Red'){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let enc=new TextEncoder()
            const note=enc.encode("Withdrawal of vote via choice coin")
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(red_address,button_address,undefined,undefined,amount,note,CHOICE_ASSET_ID,params)//Sending the specified asset to the receiver address 
            let signedtxn=txn.signTxn(red_escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            console.log("Withdraw vote transaction with txID: %s", txId);
            res.redirect("/")
        }else if(receiver=="Blue"){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let enc=new TextEncoder()
            const note=enc.encode("Withdrawal of vote via choice coin")
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(blue_address,button_address,undefined,undefined,amount,note,CHOICE_ASSET_ID,params)//Sending the specified asset to the receiver address 
            let signedtxn=txn.signTxn(blue_escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            console.log("Withdraw vote transaction with txID: %s", txId);
            res.redirect("/")}
    } catch (error) {
        console.log(error)
    }
})

//the socet io module for real time communication between backend and frontend
io.on("connection",(socket)=>{
    console.log("Websocket connected")
    //waits for vote event from front end to occur and receives data from this event 
    socket.on('vote',async (data)=>{
        let enc=new TextEncoder()
        const note=enc.encode("Voting using Choice Coin")
        const choice_per_vote=Number(data.choice_for_vote);
        //red address maps to 0 and blue address maps to 1 in this data sent from frontend
        const voter_input=data.voted_for
        console.log(voter_input)
        //if else statements that sends to selected addresses
        if(Number(voter_input)==0){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(button_address,red_address,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params)//Sending the specified asset to the address zero
            let signedtxn=txn.signTxn(escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            socket.emit("voted",`Voted for red with txID ${txId}`)
            console.log("Signed transaction with txID: %s", txId);
        }else if (Number(voter_input)==1){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(button_address,blue_address,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params) //Sending the specified asset to the address zero
            let signedtxn=txn.signTxn(escrow_key)//authenticatiing the transaction with the secret key
            await algoClient.sendRawTransaction(signedtxn).do()//sending the signed transaction to the algorand network for confirmation
            // Wait for confirmation
            let txId = txn.txID().toString();
            let confirmedTxn = await waitForConfirmation(algoClient, txId,4);//awaiting results from the blockchain 
            socket.emit("voted",`Voted for blue with txID ${txId}`)
            console.log("Signed transaction with txID: %s", txId);
        }
    })
})


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

server.listen("8000",function(){
    console.log("Server now listening on port 8000")
})
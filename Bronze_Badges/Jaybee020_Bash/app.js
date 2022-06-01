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
    'X-API-Key': 'Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 '
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
const CHOICE_ASSET_ID = 21364625;
const choice_per_vote=1;//this constant can be changed 
const button_address=""//wallet address of sender
const button_mnemonic=""//25 word pattern of address of sender
const red_address=""//address of candidate 1
const blue_address=""//address of candidate 2
const escrow_key = algosdk.mnemonicToSecretKey(button_mnemonic)['sk'];//generating the secret key from the 25 word pattern
app.use(express.static(__dirname+"/public"))//setting the public directory you want to use

app.get("/",function(req,res){
    res.render("vote.ejs")
})


//the socet io module for real time communication between backend and frontend
io.on("connection",(socket)=>{
    console.log("Websocket connected")
    //waits for vote event from front end to occur and receives data from this event 
    socket.on('vote',async (data)=>{
        let enc=new TextEncoder()
        const note=enc.encode("Voting using Choice Coin")
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
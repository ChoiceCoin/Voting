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
    'X-API-Key': ''//Your APi key here
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
const indexerClient = new algosdk.Indexer(token, "https://testnet-algorand.api.purestake.io/idx2", algoPort);
const CHOICE_ASSET_ID = 21364625;

const red_address=""//address of candidate 1
const blue_address=""//address of candidate 2
app.use(express.static(__dirname+"/public"))//setting the public directory you want to use



app.get("/",function(req,res){
    res.render("vote.ejs")
})


app.get("/voting_history/:voter_address",async function(req,res){
    try {
    let obj_array=[]
    let voter_address=req.params.voter_address
    //getting the last 20 transaction history of the given address that involved transfer of the chosen asset id
    let history=await indexerClient.searchForTransactions().address(voter_address).assetID(CHOICE_ASSET_ID).limit(20).do()
    const transactions_history=history['transactions']
    //loop to check if the receiver was red_address or blue address
    transactions_history.forEach((element)=>{
        const transaction=element['asset-transfer-transaction']
        if(transaction['receiver']==red_address){
            obj={
                'candidate':'Red','address':red_address,'Id':element['id'],'amount':transaction['amount']/100
            }
            obj_array.push(obj)
        }else if(transaction['receiver']==blue_address){
            obj={
                'candidate':'Blue','address':blue_address,'Id':element['id'],'amount':transaction['amount']/100
            }
            obj_array.push(obj) 
        }
    })
    res.render("vote_history.ejs",{results:obj_array})//passing this obj array to the the rendered front end
    } catch (error) {
        console.log(error)
    }
})

async function get_transferred_choice(address,no_of_transaction){
    let history=await indexerClient.searchForTransactions().address(address).assetID(CHOICE_ASSET_ID).limit(no_of_transaction).do()
    const transactions_history=history['transactions']
    total=0
    transactions_history.forEach((element)=>{
        const transaction=element['asset-transfer-transaction']
        total+=transaction['amount']})
    return total
}


//the socket io module for real time communication between backend and frontend
io.on("connection",async (socket)=>{
    console.log("Websocket connected")
    //waits for vote event from front end to occur and receives data from this event 

    socket.on("get_transferred_choice",async(data)=>{//data is sent address from frontend
        let no_of_transactions=20
        const total_transferred_choice=await get_transferred_choice(data,no_of_transactions)//the integer argument is the number of transactions we aim to get
        socket.emit("transferred_choice",{total_transferred_choice:total_transferred_choice,no_of_transactions:no_of_transactions})
    })

    
    socket.on('vote',async (data)=>{
        let enc=new TextEncoder()
        const note=enc.encode("Voting using Choice Coin")
        const choice_per_vote=Number(data.choice_for_vote)*100;
        //red address maps to 0 and blue address maps to 1 in this data sent from frontend
        const voter_input=data.voted_for
        const button_address=data.sender
        //if else statements that sends to selected addresses
        if(Number(voter_input)==0){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(button_address,blue_address,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params)//Sending the specified asset to the address zero
            console.log(txn.toByte())
            data={
                txn:txn.toByte(),
                txId:txn.txID().toString(),
                voted_for:'Blue'
            }//data to be sent to the front end
            socket.emit("txn",data)
        }else if (Number(voter_input)==1){
            const params=await algoClient.getTransactionParams().do();//getting the parameter objects for the transaction
            let txn=algosdk.makeAssetTransferTxnWithSuggestedParams(button_address,red_address,undefined,undefined,choice_per_vote,note,CHOICE_ASSET_ID,params) //Sending the specified asset to the address zero
            data={
                txn:txn.toByte(),
                txId:txn.txID().toString(),
                voted_for:'Red'
            }//data to be sent to the front end
            socket.emit("txn",data)
        }
    })
    socket.on('get_balance',async (data)=>{
        try {
            let account=await algoClient.accountInformation(data).do()
            let account_balance=account['amount']/1000000
            socket.emit("balance",account_balance)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('get_choice_balance',async (data)=>{
        try {
            let account=await algoClient.accountInformation(data).do()
            var choice_balance=0
            let assets_owned=account['assets']
            assets_owned.forEach(asset=>{
                if(asset['asset-id']==CHOICE_ASSET_ID){
                    choice_balance=asset['amount']/100
                }
            })    
            socket.emit("choice_balance",choice_balance)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('await_confirmation',async(data)=>{
        try {
            let confirmedTxn=await waitForConfirmation(algoClient,data.txId,4)
        socket.emit("voted",`Voted for ${data.voted_for} with txID ${data.txId}`)
        } catch (error) {
            console.log(error)
        }
        
    })

    socket.on('send_raw-await_confirmation',async(data)=>{
        try {
            const response = await algoClient.sendRawTransaction(data.signedTxn.blob).do();
            let confirmedTxn=await waitForConfirmation(algoClient,data.txId,4)
            socket.emit("voted",`Voted for ${data.voted_for} with txID ${data.txId}`)
        } catch (error) {
            console.log(error)    
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


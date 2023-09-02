const mongoose =  require("mongoose");
const dbUrl = 'mongodb://127.0.0.1:27017/choice';
const express = require("express");
const app = express();
const morgan = require("morgan")(":method :url :status");
const { User } = require("./models/users");
const { Transaction } = require("./models/transactions");
const bcrypt = require("bcrypt");
const algosdk = require("algosdk");

const algoport = "";
const baseUrl = "https://testnet-algorand.api.purestake.io/ps2";

const token = {
    "X-API-Key": ""
}

const CHOICE_ASSET_ID = 21364625;


const algodClient = new algosdk.Algodv2(token, baseUrl, algoport);


/* decisionAccounts = {
    'wallet_addres': {
        'sedd_phrase': "jdl sdml dmmk"
    }
}
e.g {
    '79wdhu7u2l00':{
        sedd_phrase: 'i0i oppo o--'
    }
}
*/
const decisionAccounts = {
    '': {
        seed_phrase: ''
    },
    '': {
        seed_phrase: ''
    }
};


const port = process.env.PORT || 8000;

async function passwordHasher () {

};

async function RegisterUser(address, password){

    //  check if the user with email already exists
    const userExists = await User.findOne({address: address});
    if (userExists) throw new Error({msg: 'Wallet with address ${email} exists'});

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // store in db
    try{
        await User.create({
            address: address,
            password: hashedPassword,
        });
        return "User Created";
    }catch (error) {
        console.log(error);
    }
};

// middlewares
app.use([express.urlencoded({extended: false}), express.json(), morgan]);
app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");
app.set("views", "./public");

app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/vote", (req, res)=>{
    res.render('vote');
});

app.get("/vote/start", (req, res)=>{
    res.render("start_vote");
});

app.route("/withdraw").get(Withdraw).post(withdrawPostHandler);


function Withdraw(req, res){
    res.render("withdraw");
};


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



async function withdrawPostHandler(req, res){
    let {address, psw} = req.body;
    try {
        // verify account details
        let user = await User.findOne({address});
        if (!user) return res.send("No Such Address Registered");

        let passwordValid = await bcrypt.compare(psw, user.password);
        if (!passwordValid) return res.send("Invalid Credentials");
        
        //get transaction
        let transaction = await Transaction.findOne({
            address,
            transactionType: "vote"
        }).sort('-createdAt');

        console.log(transaction, user);

        
        let params = await algodClient.getTransactionParams().do();
        let encoder = new TextEncoder();
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            transaction.receiverAddress,
            transaction.address,
            undefined,
            undefined,
            transaction.amount * 100,
            encoder.encode("Vote with Choice coin"),
            CHOICE_ASSET_ID,
            params
        );

        // here we sign the transaction
        let hash = algosdk.mnemonicToSecretKey(decisionAccounts[transaction.receiverAddress].seed_phrase);
        let signedTxn = txn.signTxn(hash.sk);
        // get the transaction id 
        let txId = txn.txID().toString();
        console.log(`Signed Transaction with TXID: ${txId}`)

        // here we send the actual transaction to the blockchain
        try {
            const sendTxn = await algodClient.sendRawTransaction(signedTxn).do();
            // we wait for certain time to be sure the transaction as been broadcasted on the blockchain network
            let confirmedTxn = await waitForConfirmation(algodClient, txId, 4);

            // add the withdraw transaction
            let transactionAction = await Transaction.create({
                address: transaction.receiverAddress,
                receiverAddress: transaction.address,
                amount:transaction.amount,
                assetID:CHOICE_ASSET_ID,
                txnID: txn.txID(),
                transactionType: "withdraw"
            });
            console.log(transactionAction, "saved");
            if (transactionAction) return res.redirect("/");
        }catch(error){
            let response = error.response;
            console.log(error);
            console.log({
                status_code: response.status,
                message: JSON.parse(response.text).message
            })
            return undefined;
        }
    }catch(error){
        console.error(error);
    }
};

app.route("/transaction").get(ListAllTransactions).post(CreateTransaction);

async function ListAllTransactions(req, res) {
    try {
        let transactions = await Transaction.find({});
        console.log(transactions);
        res.render("transactions", {transactions});
    }catch(error){
        console.error(error)
    }
};

async function CreateTransaction(req, res){
    const {amount, address, assetID, transactionType, receiver_address, txnID: txId} = req.body;
    console.log(txId.txId);
    try {
        let transaction = await Transaction.create({
            address,
            receiverAddress: receiver_address,
            amount: amount/ 100,
            assetID,
            txnID: txId.txId,
            transactionType
        })
        res.send("done");
    }catch(error){
        console.error(error);
    }
};

async function RegistrationHandler(req, res){
    switch (req.method){
        case "GET":
            res.render("register");
            break;
        case "POST":
            const {address, psw, psw_repeat} = req.body;
            
            if (!psw == psw_repeat) return res.send("Invalid Credentials");

            let response = await RegisterUser(address, psw);
            if (response){
                res.redirect("/");
            }
            break;
        default:
            // pass
    }
};

app.route("/register").get(RegistrationHandler).post(RegistrationHandler);

app.get("/withdraw-coin", (req, res)=>{
    res.render('vote');
});

app.get("/transactions", (req, res)=>{
    res.render('vote');
});



// App starts up only if db as been started

(
    async function startUp(){
        let dbClient= await mongoose.connect(dbUrl);
        // await console.log(dbClient);
        app.listen(port, ()=>console.log(`Server is Listening on port ${port}`));
    }
)();
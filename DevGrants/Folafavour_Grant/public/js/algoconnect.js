import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from "algosdk";
const myAlgoWallet = new MyAlgoConnect(); // new  instance of  MyAlgoConnect
window.acc ='' // stores accounts of users


async function connectToMyAlgo() {
    // This function connects the voters wallet to my program, it brings up a pop up used to connect user's wallet
    try {
        const accounts = await myAlgoWallet.connect();
        const addresses = accounts.map(account => account.address);
        window.acc = accounts
        // in case of an error in connection
    } catch (err) {
        console.error(err);
        alert("Connection error")
    }


const baseServer = "https://testnet-algorand.api.purestake.io/ps2"; //define Purestake.io server
const algod_port="";
const token = {
    "X-API-Key": "", //Input Purestake.io Api key here
};

io.on('connection', (socket) => { //creates socket connection
    console.log('a user connected');
    //Launches algosigner to connect wallet
    socket.on('connectEvent',()=>{
        const result= connectToMyAlgo().then((res)=>{
                socket.emit('result',res)
            }
        )

    }) //run vote
});
async function vote(user_input){

    var resu;
    const params = await algodClient.getTransactionParams().do(); //get transaction params

    if (user_input == "red") {
        //Draft Asset Transfer Transaction
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:button_address,
            to:red_address,
            amount:amount,
            assetIndex:asset_id,
            suggestedParams:{
                note: "Sent to address zero",
                type: "axfer", // ASA Transfer (axfer)
                fee: params.fee,
                firstRound: params.firstRound,
                lastRound: params.lastRound,
                genesisID: params.genesisID,
                genesisHash: params.genesisHash,
                flatFee: params.flatFee,
            }
        });

        // Sign transaction with the address two secret key
        const signedTxn = txn.signTxn(button_address_phrase.sk);
        //send signed transaction
        const result = await algodClient.sendRawTransaction(signedTxn).do();

        resu={
            message:`Sent to Red Address, Your Transaction ID: ${result.txId}`,
            transaction_id:result.txId
        }
    }
    else if(user_input == "blue"){
        //Draft Asset Transfer transaction
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:button_address,
            to:blue_address,
            amount:amount,
            assetIndex:asset_id,
            suggestedParams:{
                note: "Sent to Blue address",
                type: "axfer", // ASA Transfer (axfer)
                fee: params.fee,
                firstRound: params.firstRound,
                lastRound: params.lastRound,
                genesisID: params.genesisID,
                genesisHash: params.genesisHash,
                flatFee: params.flatFee,
            }
        });

        // sign transaction with address two secretkey
        const signedTxn = txn.signTxn(button_address_phrase.sk);
        //Send signed Transaction
        const result = await algodClient.sendRawTransaction(signedTxn).do();


        resu={
            message:`Sent to Blue Address, Your Transaction ID: ${result.txId}`,
            transaction_id:result.txId
        }


    }
    console.log(resu)
    return resu;
}

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port); //creates new instance of algosdk

const asset_id = 21364625;
const button_address = ""; //Put address two private key here
const blue_address="";  //Put address one private key here
const red_address=""  //Put address zero private key here

const amount = 100;


const button_address_phrase = algosdk.mnemonicToSecretKey("sick leave siren field key peasant device borrow gate gap vessel version accident august inside useful list carbon fresh panda guitar goose pulse absorb blur");} //Put address two Mnemonic Phrase here


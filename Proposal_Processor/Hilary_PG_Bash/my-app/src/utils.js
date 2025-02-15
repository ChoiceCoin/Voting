/* eslint-disable no-undef */
import algosdk from "algosdk";


const baseServer = "https://testnet-algorand.api.purestake.io/ps2"
const token = {
    "X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
};
const algod_port = '';

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port);


// Check if AlgoSigner Extension is installed
const CheckAlgoSigner = () => {
    if (typeof AlgoSigner !== "undefined"){
        return true
    } else {
        return false
    }
}


// Create Proposal Asset Function
export const createTransaction = async(user_address, title, description, amount, start, end) => {
    const params = await algodClient.getTransactionParams().do()
    console.log(`User Address ${user_address}`)
    const tkn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: user_address,
        assetName: "Choice Proposal",
        unitName: 'ChoiceCoin',
        note: AlgoSigner.encoding.stringToByteArray(description),
        title: title,
        total:  amount,
        start: start,
        end: end,
        suggestedParams: {...params}
    })
    const base64Tx = AlgoSigner.encoding.msgpackToBase64(tkn.toByte());
    return await AlgoSigner.signTxn([{
        txn: base64Tx
    }])

    // Send the transaction through the SDK client
}


// Sign Proposal Transaction Function
export const signTransaction = async(user_address, customer_address, amount) => {
    const params = await algodClient.getTransactionParams().do();
    const tkn = new algosdk.Transaction({
        from: user_address,
        to: customer_address,
        amount: +amount,
        ...params,
    });
    const binaryTx = tkn.toByte();
    const base64Tx = AlgoSigner.encoding.msgpackToBase64(binaryTx);

    const signedTx = await AlgoSigner.signTxn([{
        txn: base64Tx
    }])

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(signedTx[0].blob);

    // Send the transaction through the SDK client
    return await algodClient.sendRawTransaction(binarySignedTx).do()
}

export default CheckAlgoSigner;
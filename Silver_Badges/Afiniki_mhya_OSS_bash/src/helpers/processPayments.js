import algosdk from "algosdk"
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-key": process.env.REACT_APP_PURESTAKE_API_KEY,
};

let algodClient = new algosdk.Algodv2(token, baseServer, port);

const recoveredAccount = algosdk.mnemonicToSecretKey(
  process.env.REACT_APP_PUBLIC_SEED
);
const processPaymentTransaction = async (_address, _amount = 1) => {
  try {
    let params = await algodClient.getTransactionParams().do();

    let amount = Math.floor(_amount * 1000);

    let txn = {
      from: recoveredAccount.addr,
      to: _address,
      fee: 1,
      amount: amount,
      firstRound: params.firstRound,
      lastRound: params.lastRound,
      genesisID: params.genesisID,
      genesisHash: params.genesisHash,
      note: new Uint8Array(0),
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction : " + sendTx.txId);
    return true;
  } catch (err) {
    console.log("Failed to process transaction: ", err);
    return false;
  }
};

export default processPaymentTransaction
import "./App.css";
import algosdk from "algosdk";
import { useState } from "react";

function App() {
  const [choice, setChoice] = useState(0);
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";
  const token = {
    "X-API-key": "", // API KEY
  };
  const { AlgoSigner } = window;
  let mrA = "";
  let mrB = "";
  let mrC = "";
  let algodClient = new algosdk.Algodv2(token, baseServer, port);
  const atomicTf = async () => {
    try {
      mrA = algosdk.generateAccount();
      mrB = algosdk.generateAccount();
      mrC = algosdk.generateAccount();
      let mnemonicMrA = algosdk.secretKeyToMnemonic(mrA.sk);
      let mnemonicMrB = algosdk.secretKeyToMnemonic(mrB.sk);
      let mnemonicMrC = algosdk.secretKeyToMnemonic(mrC.sk);
      document.getElementById("notS").innerHTML += mrA.addr;
      document.getElementById("nota").innerHTML += mrB.addr;
      document.getElementById("notv").innerHTML += mrC.addr;
    } catch (error) {
      console.log(error);
    }
  };
  const receiver = "V6E5MAP2IUZAFP676CAYFDXNFBOHIVNG3BM2TDPMTC7M7O4IVPCJRKW7FM";
  const enc = new TextEncoder();
  let ser = "CP3S2LOQCQZWVZIAOIVBEDLLHU4YXWIIYW5LQ35PJHJEHJTDCHJC2LC56E";
  const connect = async () => {
    if (!AlgoSigner) {
      return alert("Kindly install AlgoSigner");
    }
    await AlgoSigner.connect()
      .then((d) => {
        document.getElementById("con").innerHTML = "Connected";
        console.log("CONNect");
      })
      .then(() =>
        AlgoSigner.accounts({
          ledger: "TestNet",
        })
      )
      .then((accountData) => {
        console.log(accountData);
        ser = accountData[0].address;
      })
      .catch((e) => console.log("error in connection" + e));
  };
  const pay = async () => {
    console.log(ser);
    let param = await algodClient.getTransactionParams().do();
    console.log(choice);
    try {
      let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        ser,
        receiver,
        undefined,
        undefined,
        Number(choice),
        enc.encode("transfer choice"),
        21364625,
        param
      );
      // Use the AlgoSigner encoding library to make the transactions base64
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
      console.log(signedTxn);
      let sendTxn = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxn[0].blob,
      });
      console.log(sendTxn);

      return sendTxn;
    } catch (error) {}
  };
  const finalshit = async () => {
    try {
      let params = await algodClient.getTransactionParams().do();
      // Transaction A to C
      let transaction1 = algosdk.makePaymentTxnWithSuggestedParams(
        mrA.addr,
        mrB.addr,
        100000,
        undefined,
        undefined,
        params
      );
      // Create transaction B to A
      let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(
        mrA.addr,
        mrC.addr,
        100000,
        undefined,
        undefined,
        params
      );
      // Combine transactions
      let txns = [transaction1, transaction2];
      // Sign each transaction in the group
      let txGroup = algosdk.assignGroupID(txns);
      console.log("knvnk");
      // Group both transactions
      let signedTx1 = transaction1.signTxn(mrA.sk);
      let signedTx2 = transaction2.signTxn(mrA.sk);
      let signed = [];
      signed.push(signedTx1);
      signed.push(signedTx2);

      console.log(signed);
      let tx = await algodClient.sendRawTransaction(signed).do();
      console.log("Transaction : " + tx.txId);

      // Wait for transaction to be confirmed
      await waitForConfirmation(algodClient, tx.txId, 10);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };
  const waitForConfirmation = async (algodClient, txId, timeout) => {
    if (algodClient == null || txId == null || timeout < 0) {
      throw new Error("Bad arguments");
    }

    const status = await algodClient.status().do();
    if (status === undefined) {
      throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < startround + timeout) {
      const pendingInfo = await algodClient
        .pendingTransactionInformation(txId)
        .do();
      if (pendingInfo !== undefined) {
        if (
          pendingInfo["confirmed-round"] !== null &&
          pendingInfo["confirmed-round"] > 0
        ) {
          //Got the completed Transaction
          return pendingInfo;
        } else {
          if (
            pendingInfo["pool-error"] != null &&
            pendingInfo["pool-error"].length > 0
          ) {
            // If there was a pool error, then the transaction has been rejected!
            throw new Error(
              "Transaction " +
                txId +
                " rejected - pool error: " +
                pendingInfo["pool-error"]
            );
          }
        }
      }
      await algodClient.statusAfterBlock(currentround).do();
      currentround++;
    }
    throw new Error(
      "Transaction " + txId + " not confirmed after " + timeout + " rounds!"
    );
  };
  return (
    <div className="App">
      <div className="header">
        <h2>Atomic transfer</h2>
      </div>
      <div className="francaDiv">
        <button id="con" onClick={connect}>
          Connect AlgoSigner
        </button>
        <h4 id="nft">Click on the button below to generate 3 accounts</h4>
        <button id="franca" onClick={atomicTf}>
          Generate
        </button>
        <button id="franca" onClick={finalshit}>
          Atomic Transfer with generated wallet
        </button>
      </div>
      <div className="address">
        <p id="notS"></p>
        <p id="nota"></p>
        <p id="notv"></p>
      </div>
      <div className="pa">
        <input
          id="pay"
          placeholder="Enter choice"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        ></input>
        <button onClick={pay} id="payBtn">
          Pay Choice
        </button>
      </div>
    </div>
  );
}

export default App;

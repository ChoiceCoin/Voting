import React from "react";
import "../../App.css";
import {
  Formlayout,
  Formw,
  Connect,
  Conne,
  Input,
  Main,
  Submit,
} from "./PopElements";
import algosdk from "algosdk";

const Popvotes = () => {
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";

  const token = {
    "X-API-key": "",
  };
  let algodClient = new algosdk.Algodv2(token, baseServer, port);

  const receiver = "V6E5MAP2IUZAFP676CAYFDXNFBOHIVNG3BM2TDPMTC7M7O4IVPCJRKW7FM";
  const enc = new TextEncoder();
  let ser = "";

  const { AlgoSigner } = window;
  const connect = async () => {
    if (!AlgoSigner) {
      return alert("Kindly install AlgoSigner");
    }
    await AlgoSigner.connect()
      .then((d) => {
        document.getElementById("connectWallet").innerHTML = "Connected";
        console.log("CONNect");
      })
      .then(() =>
        AlgoSigner.accounts({
          ledger: "TestNet",
        })
      )
      .then((accountData) => {
        console.log(accountData);
        // for (let i = 0; i < accountData.length; i++) {
        //   document.getElementById("conn").innerHTML += accountData[i].address;
        //   console.log(accountData[i].address);
        document.getElementById("conn").innerHTML +=
          "Successfully connected to \n" + accountData[0].address;
        // }
      })
      .catch((e) => console.log("error in connection" + e));
  };

  const submit = async () => {
    let inputValue = document.getElementById("propss").value;
    let amt = document.getElementById("amt").value;
    if (!inputValue) {
      alert("Enter a proposal!");
    } else {
      console.log(inputValue);
      let params = await algodClient.getTransactionParams().do();
      try {
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          ser,
          receiver,
          undefined,
          undefined,
          1,
          enc.encode("Vote with Choice coin"),
          21364625,
          params
        );
        // Use the AlgoSigner encoding library to make the transactions base64
        const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

        let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);

        let sendTxn = await AlgoSigner.send({
          ledger: "TestNet",
          tx: signedTxn[0].blob,
        });
        console.log(sendTxn);
        alert("Transaction successful!");
        document.getElementById("h").innerHTML +=
          "Successfully Created a proposal ";
        document.getElementById("pps").innerHTML += "Title: " + inputValue;
        document.getElementById("chA").innerHTML +=
          "Amout Allocated: " + amt + "$Choice";
        document.getElementById("yes").innerHTML += "Yes";
        document.getElementById("no").innerHTML += "No";
        return sendTxn;
      } catch (error) {}
    }
  };
  return (
    <>
      <Formw>
        <Conne id="conn"></Conne>
        <Formlayout>
          <Main>
            Create a proposal
            <Connect onClick={connect} id="connectWallet">
              Connect Wallet
            </Connect>
          </Main>
          <Input placeholder="Enter the Proposal Title" id="propss"></Input>
          <Input placeholder="Enter the Choice Amount" id="amt"></Input>
          <Submit onClick={submit}>Submit</Submit>
        </Formlayout>
        <div id="res" className="resl">
          <h1 id="h"></h1>
          <p id="pps"></p>
          <h2 id="chA"></h2>
          <div id="yessorno">
            <p id="yes"></p>
            <p id="no"></p>
          </div>
        </div>
      </Formw>
    </>
  );
};

export default Popvotes;

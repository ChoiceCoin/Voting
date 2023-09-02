import React, { useState } from "react";
import algosdk from "algosdk";
import {
  Form,
  Header,
  Card,
  Input,
  Button,
  Input1,
  Tab,
} from "./VotingElements";

const CreateAct = () => {
  const [addresses, setAddresses] = useState("");
  const [recAdd, setRecAdd] = useState("");
  const [darry, setdarry] = useState([]);
  const [txnId, settxnId] = useState("");
  const [choiceCoin, setChoiceCoin] = useState("");
  const [adde, setAdde] = useState([]);
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";

  const token = {
    "X-API-key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L",
  };
  const algodClient = new algosdk.Algodv2(token, baseServer, port);

  const mnemonics =
    "hip melt main celery century merge hurt robust this excess arctic duck drift cousin panda save glass capable come strike tribe section this ability fan";
  //define the adddresses
  const recoveredAct = algosdk.mnemonicToSecretKey(mnemonics);
  const red_address =
    "CP3S2LOQCQZWVZIAOIVBEDLLHU4YXWIIYW5LQ35PJHJEHJTDCHJC2LC56E";
  let blue_address = "";
  const note = "My game";
  const encoder = new TextEncoder();

  //Get  DOM Elements

  //Function to Connect User's Account

  // Sign the Transaction
  const waitForConfirmation = async function (algodClient, txId) {
    let lastround = (await algodClient.status().do())["last-round"];
    while (true) {
      const pendingInfo = await algodClient
        .pendingTransactionInformation(txId)
        .do();
      if (
        pendingInfo["confirmed-round"] !== null &&
        pendingInfo["confirmed-round"] > 0
      ) {
        console.log(
          "Payment confirmed in round " + pendingInfo["confirmed-round"]
        );
        break;
      }
      lastround++;
      await algodClient.statusAfterBlock(lastround).do();
    }
  };

  let amt = choiceCoin;
  console.log(amt);
  const createTxn = async (blue_address) => {
    const accountInfo = await algodClient
      .accountInformation(recoveredAct.addr)
      .do();
    console.log(accountInfo);
    const params = await algodClient.getTransactionParams().do();
    const AssetId = 21364625;
    if (amt != 0) {
      try {
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          recoveredAct.addr,
          "V6E5MAP2IUZAFP676CAYFDXNFBOHIVNG3BM2TDPMTC7M7O4IVPCJRKW7FM",
          undefined,
          undefined,
          Number(amt),
          encoder.encode(note),
          AssetId,
          params
        );
        let signedTxn = txn.signTxn(recoveredAct.sk);
        const response = await algodClient.sendRawTransaction(signedTxn).do();
        const itemView = [blue_address, response.txId, "Success"];
        darry.push(itemView);
        console.log(response.txId);
        if (response) {
          waitForConfirmation(algodClient, response.txId);
          // add status & txid
        } else {
          const failedView = [blue_address, response.txId, "Failed"];
          darry.push(failedView);
          console.log("An error occured");
          setdarry("Success");
        }
      } catch (error) {
        console.log("Error");
      }
    }
  };
  const list = document.querySelector("#list");
  function address(e) {
    setAddresses(e.target.value);
  }
  function choice(e) {
    setChoiceCoin(e.target.value);
  }
  ///////////////
  const truncate = (str, max, suffix) =>
    str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf("")
        )}${suffix}`;
  const newwords = addresses.split(" ");

  //////////////
  const submit = async () => {
    for (let index = 0; index < newwords.length; index++) {
      adde.push(newwords[index]);
      console.log(adde);
    }
    adde.forEach(function (number) {
      createTxn(number);
      console.log(number);
    });
    console.log(darry);
  };
  const final = async () => {
    for (let index = 0; index < darry.length; index++) {
      const myLi = document.createElement("li");
      myLi.setAttribute("id", "listItems");
      myLi.innerHTML = `<div id="mm"><h4>${truncate(
        darry[index][0],
        20,
        "..."
      )}</h4><h4>${truncate(darry[index][1], 20, "...")}</h4><h4>${
        darry[index][2]
      }</h4></div>`;
      list.appendChild(myLi);
    }
  };
  return (
    <>
      <Header>
        <div id="ff">
          <h1 id="rew">Reward Payment System</h1>
        </div>
        <Card>
          <h3 id="h3m">Addresses</h3>
          <Input value={addresses} onChange={(e) => address(e)}></Input>
          <h3 id="h3m">Amout of $Choice</h3>
          <div className="sub">
            <h2 id="dol">$</h2>
            <Input1 value={choiceCoin} onChange={(e) => choice(e)}></Input1>
            <Button onClick={submit}>Submit</Button>
            <Button onClick={final}>View Results</Button>
          </div>
          <Tab>
            <h4 className="tab_items">Wallet Address</h4>
            <h4 className="tab_items">Transaction Id</h4>
            <h4 className="tab_items">Status</h4>
          </Tab>
          <ul id="list"></ul>
        </Card>
      </Header>
    </>
  );
};

export default CreateAct;

import $ from "jquery";
import algosdk from "algosdk";
import { useEffect, useState } from "react";
import {
  Navbar,
  RewardName,
  Addresses,
  Amount,
  TxnFail,
  TxnSuccess,
} from "./Components";
import ClipLoader from "react-spinners/ClipLoader";

function Reward() {
  const [validAmt, setValidAmt] = useState(true);
  const [validName, setValidName] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [validAddresses, setValidAddresses] = useState(true);

  useEffect(() => {
    fetch("https://choice-rewards.herokuapp.com/data")
      .then((res) => res.json())
      .then((data) => {
        const wallet_data = data?.participants?.map((slug) => {
          return slug?.wallet_address;
        });
        setParticipants(wallet_data);
      });
  }, []);

  const [transactions, addTransaction] = useState([]);

  const awaitConfirmation = async function (ALGOCLIENT, txId, timeout) {
    try {
      if (ALGOCLIENT == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
      }

      const status = await ALGOCLIENT.status().do();
      if (status === undefined) {
        throw new Error("Unable to get node status");
      }

      const startround = status["last-round"] + 1;
      let currentround = startround;

      while (currentround < startround + timeout) {
        const pendingInfo = await ALGOCLIENT.pendingTransactionInformation(
          txId
        ).do();
        if (pendingInfo !== undefined) {
          if (
            pendingInfo["confirmed-round"] !== null &&
            pendingInfo["confirmed-round"] > 0
          ) {
            //Got the completed Transaction
            return "success";
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
        await ALGOCLIENT.statusAfterBlock(currentround).do();
        currentround++;
      }
      throw new Error(
        "Transaction " + txId + " not confirmed after " + timeout + " rounds!"
      );
    } catch (error) {
      console.log(error);
      return "failed";
    }
  };

  const sendToAddrress = async (CHOICE_AMT, RECEIVER_ADDRESS, REWARD_NAME) => {
    try {
      const ASSET_ID = 21364625; // CHOICE COIN ASSET ID
      const MNEMONIC = process.env.REACT_APP_MNEM; // 25 WORD MNEOMONIC OF THE SENDER

      let SENDER_ACOUNT = algosdk.mnemonicToSecretKey(MNEMONIC); // SENDER ACCOUNT
      let SENDER_ADDRESS = SENDER_ACOUNT.addr; //SENDER ADDRESS

      const PORT = ""; // PORT TO CREATE ALGO CLIENT
      const SERVER = "https://testnet-algorand.api.purestake.io/ps2"; // SERVER TO CREATE ALGO CLIENT
      const TOKEN = { "X-API-Key": process.env.REACT_APP_API_KEY }; //PURESTAKE API KEY

      const ALGOCLIENT = new algosdk.Algodv2(TOKEN, SERVER, PORT); // ALGO CLIENT GENERATED FROM THE PORT, SERVER, AND TOKEN

      const ENC = new TextEncoder(); // GENERATING A TEXT ENCODER
      const NOTE = ENC.encode(REWARD_NAME); // TRANSACTION NOTE ENCODED WITH THE TEXT ENCODER
      let PARAMS = await ALGOCLIENT.getTransactionParams().do(); // GENERATING TRANSACTION PARAMETERS

      // TRANSACTION OBJECT
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        SENDER_ADDRESS,
        RECEIVER_ADDRESS,
        undefined,
        undefined,
        CHOICE_AMT * 0.1,
        NOTE,
        ASSET_ID,
        PARAMS
      );

      console.log(txn);

      let signedTxn = txn.signTxn(SENDER_ACOUNT.sk); // SIGNED TRANSACTION
      let txId = txn.txID().toString(); // TRANSACTION ID

      await ALGOCLIENT.sendRawTransaction(signedTxn).do();

      const status = await awaitConfirmation(ALGOCLIENT, txId, 4);

      addTransaction((prevState) => [
        ...prevState,
        {
          walletAddr: RECEIVER_ADDRESS,
          txid: txId,
          status: status,
          amount: CHOICE_AMT,
        },
      ]);
    } catch (error) {
      addTransaction((prevState) => [
        ...prevState,
        {
          walletAddr: RECEIVER_ADDRESS,
          txid: "null",
          status: "failed",
          amount: CHOICE_AMT,
        },
      ]);
    }
  };

  const ProcessTxns = () => {
    if (processing) {
      return;
    }

    if (!$("#amt_inp").val()) {
      setValidAmt(false);
    } else {
      setValidAmt(true);
    }

    if (!$("#reward_name").val()) {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if (!$("#reward_wallet_addresses").val()) {
      setValidAddresses(false);
    } else {
      setValidAddresses(true);
    }

    if (
      !(
        $("#amt_inp").val() &&
        $("#reward_name").val() &&
        $("#reward_wallet_addresses").val()
      )
    ) {
      return;
    } else {
      const accounts = $("#reward_wallet_addresses").val().split(",");

      const properAccount = accounts.filter((value, index, self) => {
        return (
          self.indexOf(value) === index &&
          value !== process.env.REACT_APP_ADDR &&
          participants.includes(value)
        );
      });

      const LoopThrough = async () => {
        setProcessing(true);
        for (const item in properAccount) {
          await sendToAddrress(
            $("#amt_inp").val().trim(),
            properAccount[item],
            $("#reward_name").val()
          );
        }
        setProcessing(false);
      };

      LoopThrough();
    }
  };

  const Table = () => (
    <div className="table">
      <ul className="table_head">
        <li className="wallet_addr">Wallet Address</li>
        <li className="txn_id">Transaction ID</li>
        <li className="status">Status</li>
        <li className="list_amt">Amount</li>
      </ul>

      {transactions?.map((item, index) => {
        console.log(transactions);

        return (
          <ul className="table_entry" key={index}>
            <li className="wallet_addr">
              <p>{item?.walletAddr}</p>
            </li>
            <li className="txn_id">
              <p>{item?.txid}</p>
            </li>
            <li className="status">
              {item?.status == "success" ? <TxnSuccess /> : <TxnFail />}
            </li>
            <li className="status">{item?.amount}</li>
          </ul>
        );
      })}
    </div>
  );

  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <RewardName validName={validName} />
        <Addresses validAddresses={validAddresses} />
        <Amount validAmt={validAmt} />

        <div className="submit_container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {processing && (
              <>
                <ClipLoader color={"#757575"} size={15} />
                <p style={{ marginLeft: "5px" }}>Transactions processing</p>
              </>
            )}
          </div>
          <button
            className="submit"
            style={{ opacity: processing ? 0.5 : 1 }}
            id="submit_txn"
            onClick={ProcessTxns}
          >
            Submit
          </button>
        </div>

        <Table />
      </div>
    </div>
  );
}

export default Reward;

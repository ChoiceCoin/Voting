import algosdk from "algosdk";
import { useState } from "react";
import { useAlert } from "react-alert";

const App = () => {
  const alert = useAlert();
  const [addr, setAddr] = useState(0);
  //

  const awaitConfirmation = async function (algodClient, txId, timeout) {
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

  const sendToAddrress = async () => {
    const ASSET_ID = 21364625;
    const button_mnemonic = "";

    // 25 Word Mnemonic of Sender(button_address)
    let myAccount = algosdk.mnemonicToSecretKey(button_mnemonic);

    // Wallet Addresses of Sender, Receiver 1 and Receiver 2 respectively
    let button_address = myAccount.addr;
    const red_address = "";
    const blue_address = "";

    // Parameters to setup a client on Algorand
    const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
    const port = "";
    const token = {
      "X-API-Key": "", //Testnet token
    };

    // algod client
    const algodClient = new algosdk.Algodv2(token, baseServer, port);

    // Amount of Choice coin to send
    let choiceAmt = 100;

    // Encoding option to vote with choice coin
    const enc = new TextEncoder();
    const note = enc.encode("Voting using Choice Coin");

    // An Object containing Parameters for the transaction
    let params = await algodClient.getTransactionParams().do();

    if (addr === 0) {
      // transfering Assets to red address
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        button_address,
        red_address,
        undefined,
        undefined,
        choiceAmt,
        note,
        ASSET_ID,
        params
      );

      // Validating Transaction using the button_address secret key
      let signedTxn = txn.signTxn(myAccount.sk);
      // Transaction Id
      let txId = txn.txID().toString();

      // Sending transaction to Algorand for processing
      await algodClient.sendRawTransaction(signedTxn).do();
      console.log("Transaction Id is: %s", txId);
      alert.show(`Sent 1 Choice to red_address:  ${txId}`);

      await awaitConfirmation(algodClient, txId, 4);
    } else if (addr === 1) {
      // transfering Assets to blue address
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        button_address,
        blue_address,
        undefined,
        undefined,
        choiceAmt,
        note,
        ASSET_ID,
        params
      );

      // Validating Transaction using the button_address secret key
      let signedTxn = txn.signTxn(myAccount.sk);
      // Transaction Id
      let txId = txn.txID().toString();

      // Sending transaction to Algorand for processing
      await algodClient.sendRawTransaction(signedTxn).do();
      console.log("Transaction Id is: %s", txId);
      alert.show(`Sent 1 Choice to blue_address:  ${txId}`);

      await awaitConfirmation(algodClient, txId, 4);
    }
  };

  return (
    <>
      <div className="container">
        <nav>
          <div className="nav_logo">
            <p>Choice Coin</p>
          </div>

          <div className="menu_butt">
            <i className="uil uil-bars"></i>
          </div>

          <ul className="nav_links">
            <li>Add participant</li>
            <li>Manage voting</li>
            <li>Cast vote</li>
            <li>
              about &nbsp;<i className="uil uil-asterisk"></i>
            </li>
          </ul>
        </nav>

        <div className="landing">
          <div className="row1">
            <div className="land_item land_item1">
              <p>
                Choice coin: A <br /> governance token <br />
                for a new age.
              </p>
              <p>
                Choice Coin is a governance token that powers the Fortior Voting
                Protocol, which leverages Artificial Intelligence and Quantum
                Computing to voting algorithms that are secure, equitable, and
                efficient.
              </p>
            </div>

            <div className="land_item land_item2">
              <p>
                A democratic <br />
                token for a new era
              </p>
              <p>
                Choice Coin is a not just a governance token; rather, it is a
                representation of a world that is moving toward decentralization
                and openess.
                <br />
                <br />
                It powers Decentralized Voting Tech that will define governance
                for the next generation.
              </p>
            </div>

            <div className="land_item land_item3">
              <p>Voting Algorithms that allow everyone to have a say</p>
              <p>
                Fortior's voting algorithm is simple; it allows anyone who
                should have a say vote without difficulty.
              </p>
            </div>
          </div>
          <div className="row2">
            <div
              className="buttons_row"
              onChange={(e) => {
                setAddr(Number(e.target.value));
              }}
            >
              <div className="select_buttons">
                <label>Red</label>
                <input type="radio" name="addr" value="0" />
              </div>
              <div className="select_buttons">
                <label>Blue</label>
                <input type="radio" name="addr" value="1" />
              </div>
            </div>

            <button className="submit" onClick={() => sendToAddrress()}>
              Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

import algosdk from "algosdk";
import { useState } from "react";
import { useAlert } from "react-alert";

const App = () => {
  const alert = useAlert();
  const [addr, setAddr] = useState(0);
  //

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
            return "successs";
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

  const sendToAddrress = async (CHOICE_AMT, RECEIVER_ADDRESS) => {
    const ASSET_ID = 21364625; // CHOICE COIN ASSET ID
    const MNEMONIC = process.env.REACT_APP_MNEM; // 25 WORD MNEOMONIC OF THE SENDER

    let SENDER_ACOUNT = algosdk.mnemonicToSecretKey(MNEMONIC); // SENDER ACCOUNT
    let SENDER_ADDRESS = SENDER_ACOUNT.addr; //SENDER ADDRESS

    const PORT = ""; // PORT TO CREATE ALGO CLIENT
    const SERVER = "https://testnet-algorand.api.purestake.io/ps2"; // SERVER TO CREATE ALGO CLIENT
    const TOKEN = { "X-API-Key": process.env.REACT_APP_API_KEY }; //PURESTAKE API KEY

    const ALGOCLIENT = new algosdk.Algodv2(TOKEN, SERVER, PORT); // ALGO CLIENT GENERATED FROM THE PORT, SERVER, AND TOKEN

    const ENC = new TextEncoder(); // GENERATING A TEXT ENCODER
    const NOTE = ENC.encode("Multiple transaction transferring Choice"); // TRANSACTION NOTE ENCODED WITH THE TEXT ENCODER
    let PARAMS = await ALGOCLIENT.getTransactionParams().do(); // GENERATING TRANSACTION PARAMETERS

    // TRANSACTION OBJECT
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      SENDER_ADDRESS,
      RECEIVER_ADDRESS,
      undefined,
      undefined,
      CHOICE_AMT,
      NOTE,
      ASSET_ID,
      PARAMS
    );

    let signedTxn = txn.signTxn(SENDER_ACOUNT.sk); // SIGNED TRANSACTION
    let txId = txn.txID().toString(); // TRANSACTION ID

    await ALGOCLIENT.sendRawTransaction(signedTxn).do();
    console.log("Transaction Id is: %s", txId);
    alert.show(`Sent 1 Choice to red_address:  ${txId}`);

    const status = await awaitConfirmation(ALGOCLIENT, txId, 4);

    console.log(status);

    addTransaction([
      ...transactions,
      { walletAddr: RECEIVER_ADDRESS, txid: txId, status: "success" },
    ]);
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

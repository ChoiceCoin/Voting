import "../styles/transfer.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ASSET_ID } from "../constants";
import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const Index = () => {
  const [amount, setAmount] = useState(0);
  const [addr, setAddr] = useState("");

  const [balance, setBalance] = useState(0);

  const dispatch = useDispatch();

  // algod Client
  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const myAlgoWallet = new MyAlgoConnect();

  // wallet-type & address
  const walletType = localStorage.getItem("wallet-type");
  const walletAddress = localStorage.getItem("address");

  const makeTransfer = async () => {
    // check if localStorage items were deleted.
    if (!walletType || !walletAddress) {
      dispatch({ type: "modal_connect" });
      return;
    }

    const myAccountInfo = await algodClient
      .accountInformation(walletAddress)
      .do();

    if (myAccountInfo.assets.length === 0) {
      alert("You need to optin to Choice Coin");
      return;
    }

    // const receiverAccountInfo = await algodClient.accountInformation(addr).do();

    // compare amount to send with user balance
    if (amount > balance) {
      alert("You do not have sufficient balance to make this transaction.");
      return;
    }

    // send choice to wallet
    const suggestedParams = await algodClient.getTransactionParams().do();
    const amountToSend = Math.abs(amount * 100);
    // console.log(typeof amountToSend, amountToSend);

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: walletAddress,
      to: addr,
      amount: amountToSend,
      assetIndex: ASSET_ID,
      suggestedParams,
    });

    // based on wallet type
    try {
      if (walletType === "my-algo") {
        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        await algodClient.sendRawTransaction(signedTxn.blob).do();
      } else if (walletType === "algosigner") {
        const signedTxn = await window.AlgoSigner.signTxn([
          { txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()) },
        ]);
        await algodClient
          .sendRawTransaction(
            window.AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
          )
          .do();
      }

      alert(`${amount} $CHOICE sent successfully to ${addr}!`);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  const setMaxBalance = () => {
    setAmount(balance);
  };

  useEffect(() => {
    const setMyBalance = async () => {
      const myAccountInfo = await algodClient
        .accountInformation(walletAddress)
        .do();

      const b = myAccountInfo.assets
        ? myAccountInfo.assets.find(
            (element) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      setBalance(b);
    };

    setMyBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transfer_cont">
      <div className="transfer_cont_inn">
        <div className="trans_hd">Transfer Choices To Any Address here</div>

        <div className="transf_inps">
          <div className="transf_input_cover">
            <p className="trsf_amt">Amount to send</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="trsf_max">
                <button onClick={setMaxBalance}>Max</button>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              fontSize: "17px",
              borderRadius: "100%",
              alignItems: "center",
              margin: "10px 0px",
              flexDirection: "column",
              justifyContent: "center",
              border: "1px solid var(--txt-alt)",
            }}
          >
            <i
              className="uil uil-exchange"
              style={{ transform: "rotate(90deg)" }}
            ></i>
          </div>

          <div className="transf_input_cover">
            <input
              type="text"
              value={addr}
              placeholder="Wallet address to send to"
              onChange={(e) => setAddr(e.target.value)}
            />
          </div>

          <button className="submitTrsf" onClick={makeTransfer}>
            Transfer Assets
          </button>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Index;

import "./transfer.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASSET_ID } from "../constants";
import algosdk from "algosdk";
import { apiGetTxnParams } from "../utils/api";
import {
  IAssetData,
  selectAddress,
  selectAssets,
  selectChain,
  selectConnector,
  selectWalletType,
} from "../store/walletSlice";
import { sendWait, sign } from "../utils/walletUtils";

const Index = () => {
  const [amount, setAmount] = useState("");
  const [addr, setAddr] = useState("");
  const chain = useSelector(selectChain);
  const assets = useSelector(selectAssets);
  const connector = useSelector(selectConnector);
  const walletType = useSelector(selectWalletType);
  const address = useSelector(selectAddress);

  const [balance, setBalance] = useState<bigint>();

  const dispatch = useDispatch();

  const makeTransfer = async () => {
    // check if localStorage items were deleted.
    if (!walletType || !address) {
      dispatch({ type: "modal_connect" });
      return;
    }

    // check if the voter address has Choice
    const containsChoice = assets
      ? assets.some((element: any) => element["id"] === ASSET_ID)
      : false;

    if (assets.length === 0 || !containsChoice) {
      alert("You need to opt into Choice Coin");
      dispatch({ type: "close_vote_modal" });
      return;
    }

    // compare amount to send with user balance
    if (balance && Number(amount) > balance) {
      alert("You do not have sufficient balance to make this transaction.");
      return;
    }

    const suggestedParams = await apiGetTxnParams(chain);

    const amountToSend = Math.abs(Number(amount) * 100);

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: addr,
      amount: amountToSend,
      assetIndex: ASSET_ID,
      suggestedParams,
    });

    // TODO: error handling
    const signedTxn = await sign([txn], walletType, connector);
    const result = await sendWait(signedTxn, chain);
    if (result["pool-error"])
      throw new Error("Failed: " + result["pool-error"]);

    // alert success
    alert(`${amount} $CHOICE sent successfully to ${addr}!`);
  };

  const setMaxBalance = () => {
    const choiceCoin =
      assets &&
      assets.find((asset: IAssetData) => asset && asset.id === ASSET_ID);
    const _maxBalance = (choiceCoin?.amount ?? BigInt(0)) / BigInt(100);
    setBalance(_maxBalance);
    setAmount(_maxBalance.toString());
  };

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
                min="0"
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
        </div>
      </div>
    </div>
  );
};

export default Index;

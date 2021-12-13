import MyAlgoConnect from "@randlabs/myalgo-connect";
import react, { useEffect, useState } from "react";
import algosdk from "algosdk";
import { useSelector, useDispatch } from "react-redux";
import { SessionWallet } from "algorand-session-wallet";
import { ASSET_ID } from "../constants";
import algowallet from "../assets/algorandwallet.svg";
import myalgo from "../assets/myalgo.svg";
import algosigner from "../assets/algosigner.svg";
import ScrollText from "../components/ScrollText";

const PopFromBottomModalToVote = () => {
  const [sw, setSw] = useState(new SessionWallet("TestNet"));
  const dispatch = useDispatch();

  // algod Client
  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletAddress = localStorage.getItem("address") || "";

  const { openModalVote, voteData } = useSelector(
    (state) => (state as any).status.voteModal
  );

  const connectWallet = async (walletType: string) => {
    const w = new SessionWallet("TestNet", undefined, walletType);

    if (!(await w.connect())) return alert("Couldnt connect");
    // ...
    const address = w.getDefaultAccount();
    setSw(w);
    dispatch({ type: "walletType", walletType });
    dispatch({ type: "address", address });
  };

  useEffect(() => {
    if (sw) {
      dispatch({ type: "close_vote_modal" });
    }
  }, [sw]);

  const myAlgoConnect = async () => {
    const myAlgoWallet = new MyAlgoConnect();

    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
      const address = accounts[0].address;

      // if the address trying to vote is the same as the election creator
      // if (address === voteData.election.wallet.address) {
      //   alert("You cannot vote in an election you created");
      //   dispatch({ type: "close_vote_modal" });
      //   return;
      // }

      const myAccountInfo = await algodClient
        .accountInformation(walletAddress)
        .do();

      // get balance of the voter
      const balance = myAccountInfo.assets
        ? myAccountInfo.assets.find(
            (element: any) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      // check if the voter address has Choice
      const containsChoice = myAccountInfo.assets
        ? myAccountInfo.assets.some(
            (element: any) => element["asset-id"] === ASSET_ID
          )
        : false;

      // if the address has no ASAs
      if (myAccountInfo.assets.length === 0) {
        alert("You need to optin to Choice Coin");
        dispatch({ type: "close_vote_modal" });
        return;
      }

      if (!containsChoice) {
        alert("You need to optin to Choice Coin");
        dispatch({ type: "close_vote_modal" });
        return;
      }

      if (voteData.amount > balance) {
        alert("You do not have sufficient balance to make this transaction.");
        return;
      }

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = voteData.amount * 100;

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: voteData.address,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
      });

      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      await algodClient.sendRawTransaction(signedTxn.blob).do();

      // close modal.
      dispatch({ type: "close_vote_modal" });

      // alert success
      alert("You have successfully placed your vote for this election");
    } catch (error) {
      console.log(error);
    }
  };

  const algoSignerConnect = async () => {
    try {
      if (typeof (window as any).AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        const accounts = await (window as any).AlgoSigner.accounts({
          ledger: "TestNet",
        });
        const address = accounts[0].address;

        // if the address trying to vote is the same as the election creator
        if (address === voteData.election.wallet.address) {
          alert("You cannot vote in an election you created");
          dispatch({ type: "close_vote_modal" });
          return;
        }

        const myAccountInfo = await algodClient
          .accountInformation(walletAddress)
          .do();

        // get balance of the voter
        const balance = myAccountInfo.assets
          ? myAccountInfo.assets.find(
              (element: any) => element["asset-id"] === ASSET_ID
            ).amount / 100
          : 0;

        // check if the voter address has Choice
        const containsChoice = myAccountInfo.assets
          ? myAccountInfo.assets.some(
              (element: any) => element["asset-id"] === ASSET_ID
            )
          : false;

        // if the address has no ASAs
        if (myAccountInfo.assets.length === 0) {
          alert("You need to optin to Choice Coin");
          dispatch({ type: "close_vote_modal" });
          return;
        }

        if (!containsChoice) {
          alert("You need to optin to Choice Coin");
          dispatch({ type: "close_vote_modal" });
          return;
        }

        if (voteData.amount > balance) {
          alert("You do not have sufficient balance to make this transaction.");
          return;
        }

        const suggestedParams = await algodClient.getTransactionParams().do();
        const amountToSend = voteData.amount * 100;

        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: address,
          to: voteData.address,
          amount: amountToSend,
          assetIndex: ASSET_ID,
          suggestedParams,
        });

        const signedTxn = await (window as any).AlgoSigner.signTxn([
          {
            txn: (window as any).AlgoSigner.encoding.msgpackToBase64(
              txn.toByte()
            ),
          },
        ]);
        await algodClient
          .sendRawTransaction(
            (window as any).AlgoSigner.encoding.base64ToMsgpack(
              signedTxn[0].blob
            )
          )
          .do();

        // close modal.
        dispatch({ type: "close_vote_modal" });

        // alert success
        alert("You have successfully placed your vote for this election");
      }
    } catch (error) {
      alert("An error occured while trying to connect AlgoSigner");
    }
  };

  return (
    <menu
      className="mn_sm"
      style={{ display: `${!!openModalVote ? "flex" : "none"}` }}
    >
      <div
        style={{ width: "100%", flex: 1 }}
        onClick={() => {
          dispatch({ type: "close_vote_modal" });
        }}
      ></div>

      <div className="mn_sm_modal">
        <div className="mn_sm_modal_inn">
          <>
            <div className="algo_connect_hd">Select Wallet to continue</div>

            <div
              className="connect_butt"
              onClick={() => connectWallet("wallet-connect")}
            >
              <div className="connect_wallet_img">
                <img src={algowallet} alt="" />
              </div>
              <p className="connect_wallet_txt">Algorand Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => connectWallet("my-algo-connect")}
            >
              <div className="connect_wallet_img">
                <img src={myalgo} alt="" />
              </div>
              <p className="connect_wallet_txt">My Algo Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => connectWallet("algo-signer")}
            >
              <div className="connect_wallet_img">
                <img src={algosigner} alt="" />
              </div>
              <p className="connect_wallet_txt">
                {typeof (window as any).AlgoSigner === undefined
                  ? "Install AlgoSigner"
                  : "AlgoSigner"}
              </p>
            </div>
          </>

          <ScrollText word={"Decentralized decisions"} />
        </div>
      </div>
    </menu>
  );
};

export default PopFromBottomModalToVote;

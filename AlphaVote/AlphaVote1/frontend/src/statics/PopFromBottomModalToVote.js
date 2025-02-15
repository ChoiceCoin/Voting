import ScrollText from "../components/ScrollText";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { useSelector, useDispatch } from "react-redux";
import { ASSET_ID } from "../constants";
const PopFromBottomModalToVote = () => {
  const dispatch = useDispatch();

  // algod Client
  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletAddress = localStorage.getItem("address");

  const { openModalVote, voteData } = useSelector(
    (state) => state.status.voteModal
  );

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
            (element) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      // check if the voter address has Choice
      const containsChoice = myAccountInfo.assets
        ? myAccountInfo.assets.some(
            (element) => element["asset-id"] === ASSET_ID
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
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        const accounts = await window.AlgoSigner.accounts({
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
              (element) => element["asset-id"] === ASSET_ID
            ).amount / 100
          : 0;

        // check if the voter address has Choice
        const containsChoice = myAccountInfo.assets
          ? myAccountInfo.assets.some(
              (element) => element["asset-id"] === ASSET_ID
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

        const signedTxn = await window.AlgoSigner.signTxn([
          { txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()) },
        ]);
        await algodClient
          .sendRawTransaction(
            window.AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
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

            <div className="connect_butt" onClick={myAlgoConnect}>
              <div className="connect_wallet_img">
                <img
                  src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                  alt=""
                />
              </div>
              <p className="connect_wallet_txt">My Algo Wallet</p>
            </div>
            <div className="connect_butt" onClick={algoSignerConnect}>
              <div className="connect_wallet_img">
                <img
                  src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                  alt=""
                />
              </div>
              <p className="connect_wallet_txt">
                {typeof AlgoSigner === undefined
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

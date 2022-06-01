import _ from "lodash";
import $ from "jquery";
import "./styles/electionlist.css";
import { useDispatch, useSelector } from "react-redux";

import algosdk from "algosdk";
import { ASSET_ID } from "./constants";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

const ElectionList = () => {
  const dispatch = useDispatch();

  const addressNum = useSelector((state) => state.status.addressNum);

  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );
  const walletAddress = localStorage.getItem("address");
  const walletType = localStorage.getItem("wallet-type");

  const addresses = localStorage.getItem("addresses")?.split(",");

  const isThereAddress = localStorage.getItem("address");

  const data = [
    {
      candidates: [
        {
          address: "DQ2NPLGQ3CV3QAPMS7KHIRUNUF2ZSTYRT5SZGDCPLB7VPC5OSSLCI5H7DM",
          image: "",
          name: "Yes",
        },

        {
          address: "6P6D5KQH5VIXEJGW6LXPUMEZ77XNLHQXB6GMW4CBDBN2VJ4CFZ7HCIKUBM",
          image: "",
          name: "No",
        },
      ],
      choice_per_vote: 1,
      created_at: "2021-12-08T10:32:15.878473",
      description: "Lorem ipsum",
      is_finished: false,
      is_started: true,
      process_image: "https://i.postimg.cc/90XSyrjH/choice.png",
      slug: "CHOICE-COIN-IS-A-STANDARD-ALGORAND-ASSET-b0c7db",
      title: "CHOICE COIN IS A STANDARD ALGORAND ASSET",
      wallet: {
        address: "NX4T2FTIGNPVPSMEXJFMMKD46O4HRCPN25BDHOUW2SWXANZPQBZEDYKDVE",
      },
    },
  ];

  const myAlgoConnect = async (voteData) => {
    const myAlgoWallet = new MyAlgoConnect();

    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
      const address = !!isThereAddress ? isThereAddress : accounts[0].address;

      const myAccountInfo = await algodClient
        .accountInformation(
          !!isThereAddress ? isThereAddress : accounts[0].address
        )
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
      window.location.reload();
    } catch (error) {
      alert("An error occured the during transaction process");
      console.log(error);
    }
  };

  const algoSignerConnect = async (voteData) => {
    try {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        const address = !!isThereAddress ? isThereAddress : accounts[0].address;

        const myAccountInfo = await algodClient
          .accountInformation(
            !!isThereAddress ? isThereAddress : accounts[0].address
          )
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
        window.location.reload();
      }
    } catch (error) {
      alert("An error occured the during transaction process");
      console.log(error);
    }
  };

  const algoMobileConnect = async (voteData) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    try {
      const address = !!isThereAddress ? isThereAddress : "";

      const myAccountInfo = await algodClient.accountInformation(address).do();

      const balance = myAccountInfo.assets
        ? myAccountInfo.assets.find(
            (element) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      const containsChoice = myAccountInfo.assets
        ? myAccountInfo.assets.some(
            (element) => element["asset-id"] === ASSET_ID
          )
        : false;

      if (myAccountInfo.assets.length === 0) {
        alert("You need to optin to Choice Coin");
        return;
      }

      if (!containsChoice) {
        alert("You need to optin to Choice Coin");
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

      const txnsToSign = [
        {
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
            "base64"
          ),
          message: "Transaction using Mobile Wallet",
        },
      ];

      const requestParams = [txnsToSign];

      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);

      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

      console.log(decodedResult);

      await algodClient.sendRawTransaction(decodedResult).do();

      alert("You have successfully placed your vote for this election");
      window.location.reload();
    } catch (error) {
      alert("An error occured the during transaction process");
      console.log(error);
    }
  };

  const placeVote = (address, amount, election) => {
    if (!address) {
      alert("Select an option to vote!!");
      return;
    }

    if (walletType === "my-algo") {
      myAlgoConnect({ address, amount, election });
    } else if (walletType === "algosigner") {
      algoSignerConnect({ address, amount, election });
    } else if (walletType === "walletconnect") {
      algoMobileConnect({ address, amount, election });
    }
  };

  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p><strong>CHOICE-COIN VOTING PARTICIPATION</strong></p>
        </div>
        <ul className="card_list">
          {data?.map((slug, index) => {
            return (
              <div className="card_cont" key={index}>
                <div className="card_r1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_elt_img">
                      {slug.process_image ? (
                        <img src={slug.process_image} alt="" />
                      ) : (
                        <i
                          className="uil uil-asterisk"
                          style={{ paddingLeft: "2px", paddingBottom: "2px" }}
                        />
                      )}
                    </div>
                    <div className="card_elt_tit">{slug.title}</div>
                  </div>

                  {/* <div className="electionEndTime">Ends on:</div> */}
                </div>

                <div className="card_elt_desc">{slug?.card_desc}</div>

                <div className="card_cand">
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Amount of Choice to commit:</p>
                      <input
                        type="number"
                        min="1"
                        placeholder="1"
                        className="amtToCommitInp"
                      />
                    </div>
                  </div>

                  <div className="vote_collap">
                    <div className="card_cand_hd">Options</div>
                    <ul className="vote_now_list">
                      {slug?.candidates?.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="options"
                              value={item.address}
                            />

                            <div className="vote_img_cont">
                              {!!item.image ? (
                                <img src={item.image} alt="" />
                              ) : (
                                <i className="uil uil-asterisk"></i>
                              )}
                            </div>
                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="rec_vote_cont">
                      <button
                        className="record_vote"
                        onClick={(e) => {
                          var voteVal = $(e.target)
                            .closest(".card_cand")
                            .find(".vote_now_list");

                          var amountToSend = $(e.target)
                            .closest(".card_cand")
                            .find(".amtToCommitInp")
                            .val();

                          var amt = !!amountToSend
                            ? amountToSend
                            : slug.choice_per_vote;

                          placeVote(
                            $("input[name=options]:checked", voteVal).val(),
                            amt,
                            slug
                          );
                        }}
                      >
                        Submit vote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ElectionList;

// import $ from "jquery";
import axios from "axios";
import algosdk from "algosdk";
import { useState } from "react";
import "./styles/electionlist.css";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useDispatch, useSelector } from "react-redux";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { ASSET_ID, ELECTION_ID, URL, ADDRESS_1, ADDRESS_2 } from "./constants";

const ElectionList = () => {
  const dispatch = useDispatch();

  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);

//   const { isLoading, error, data } = useQuery("elections", () =>
//     axios.get(`${URL}/results/${ELECTION_ID}`).then((response) => {
//       if (response?.data?.data) {
//         setAddress1(response?.data?.data[ADDRESS_1]);
//         setAddress2(response?.data?.data[ADDRESS_2]);
//       }
//     })
//   );

  const darkTheme = useSelector((state) => state.status.darkTheme);

  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletType = localStorage.getItem("wallet-type");
  const isThereAddress = localStorage.getItem("address");

  const election_data = [
    {
      candidates: [
        {
          address: "DQ2NPLGQ3CV3QAPMS7KHIRUNUF2ZSTYRT5SZGDCPLB7VPC5OSSLCI5H7DM",
          image: "",
          name: "75 million Choice  dispensed each year for the next 10 years",
        },

        {
          address: "6P6D5KQH5VIXEJGW6LXPUMEZ77XNLHQXB6GMW4CBDBN2VJ4CFZ7HCIKUBM",
          image: "",
          name: "150 million Choice dispensed each year for the next 5 years",
        },
      ],
      card_desc:
        "Vote 0 is on the annual distribution of Choice Coin's Reserve address. Currently, the reserve address holds 750 Million Choice. This vote will decide whether distirbution will be a annual rate of 150 million Choice per year for the next 5 years, or a rate of 75 million Choice per year for the next 10 years.",
      choice_per_vote: 1,
      created_at: "2021-12-08T10:32:15.878473",
      description: "Lorem ipsum",
      is_finished: false,
      is_started: true,
      process_image: "https://i.postimg.cc/90XSyrjH/choice.png",
      slug: "is-choice-coin-the-best-b0c7db",
      title: "Reserve Address Distribution",
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
        dispatch({
          type: "alert_modal",
          alertContent: "You need to opt-in to Choice Coin in your Algorand Wallet.",
        });
        return;
      }

      if (!containsChoice) {
        dispatch({
          type: "alert_modal",
          alertContent: "You need to opt-in to Choice Coin in your Algorand Wallet.",
        });
        return;
      }

      if (voteData.amount > balance) {
        dispatch({
          type: "alert_modal",
          alertContent:
            "You do not have sufficient balance to make this transaction.",
        });
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

      // alert success
      dispatch({
        type: "alert_modal",
        alertContent:
          "Your vote has been recorded.",
      });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        dispatch({
          type: "alert_modal",
          alertContent: "An error occured the during transaction process",
        });
      }
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
          dispatch({
            type: "alert_modal",
            alertContent: "You need to opt-in to Choice Coin in your Algorand Wallet.",
          });
          return;
        }

        if (!containsChoice) {
          dispatch({
            type: "alert_modal",
            alertContent: "You need to opt-in to Choice Coin in your Algorand Wallet.",
          });
          return;
        }

        if (voteData.amount > balance) {
          dispatch({
            type: "alert_modal",
            alertContent:
              "You do not have sufficient balance to make this transaction.",
          });
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

        // alert success
        dispatch({
          type: "alert_modal",
          alertContent:
            "Your vote has been recorded.",
        });
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        dispatch({
          type: "alert_modal",
          alertContent: "An error occured the during transaction process",
        });
      }
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
        alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
        return;
      }

      if (!containsChoice) {
        alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
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

      // alert success
      dispatch({
        type: "alert_modal",
        alertContent:
          "Your vote has been recorded.",
      });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        dispatch({
          type: "alert_modal",
          alertContent: "An error occured the during transaction process",
        });
      }
    }
  }
  const placeVote = (address, amount, election) => {
    if (!address) {
      dispatch({
        type: "alert_modal",
        alertContent: "Select an option to vote!!",
      });
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

  if (isLoading)
    return (
      <>
      </>
    );
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
    </>
  );
};

export default ElectionList;
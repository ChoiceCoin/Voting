import $ from "jquery";
import algosdk from "algosdk";
import { useState } from "react";
import "./styles/electionlist.css";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { useRouter } from "next/router";
import { ASSET_ID, ELECTION_ID, URL, ADDRESS_1, ADDRESS_2 } from "./constants";

const ElectionList = ({amount}) => {
  const Router = useRouter()
  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);

  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletType = localStorage.getItem("wallet-type");
  const isThereAddress = localStorage.getItem("address");

  const myAlgoConnect = async (votingAddress) => {
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

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = amount * 100;

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
      alert("You have Successfully voted");
      setTimeout(() => Router.push("/"), 1500);
    } catch (error) {
      alert("Error encounterd while voting");
    }
  };
  const algoSignerConnect = async (votingAddress) => {
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

        const suggestedParams = await algodClient.getTransactionParams().do();
        const amountToSend = voteData.amount * 100;

        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: address,
          to: votingAddress, //!Give value
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
        alert("Successfully voted")
        setTimeout(() => Router.push("/"), 1500);
      }
    } catch (error) {
      alert(`Error encoutered ${error}`)
    }
  };
  const algoMobileConnect = async (votingAddress) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    try {
      const address = !!isThereAddress ? isThereAddress : "";

      const myAccountInfo = await algodClient.accountInformation(address).do();

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = amount * 100;

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: votingAddress,
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
      alert("Successful")
      setTimeout(() => Router.push("/"), 1500);
    } catch (error) {
     alert(error)
    }
  };

  const placeVote = (address, amount, election) => {
    if (!address) {
      alert({
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

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      .
    </>
  );
};

export default ElectionList;

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;
let senderAddress;
let chainValue;
let txParams;

const connectButton = document.getElementById("connect");

const algodToken = "3Jxaz1Vqt51y62yGF4Ykpasc2QQZ6FjJ3YgOA93B";
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";

let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

async function waitForTransaction(chain, txId) {
  const client = new algosdk.Algodv2(
    "",
    "https://testnet.algoexplorerapi.io",
    ""
  );
  let lastStatus = await client.status().do();
  let lastRound = lastStatus["last-round"];
  while (true) {
    const status = await client.pendingTransactionInformation(txId).do();
    if (status["pool-error"]) {
      throw new Error(`Transaction Pool Error: ${status["pool-error"]}`);
    }
    if (status["confirmed-round"]) {
      return status["confirmed-round"];
    }
    lastStatus = await client.statusAfterBlock(lastRound + 1).do();
    lastRound = lastStatus["last-round"];
    if (txId) {
      document.getElementById("success").classList.remove("d-none");
      document.getElementById("txnID").textContent = txId;
      document.getElementById("txnID").addEventListener("click",()=>{
        window.location.href=`https://testnet.algoexplorer.io/tx/${txId}`;
      })
      document.getElementById("submit").textContent = 'submit';
      document.getElementById("submit").removeAttribute("disabled");
    }
  }
}
export async function apiSubmitTransactions(chain, stxns) {
  const { txId } = await new algosdk.Algodv2(
    "",
    "https://testnet.algoexplorerapi.io",
    ""
  )
    .sendRawTransaction(stxns)
    .do();
  console.log("txId", txId);
  return await waitForTransaction(chain, txId);
}

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established

const mainNetClient = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");
const testNetClient = new algosdk.Algodv2(
  "",
  "https://testnet.algoexplorerapi.io",
  ""
);

function clientForChain(chain) {
  switch (chain) {
    case "mainnet":
      return mainNetClient;
    case "testnet":
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

export async function apiGetTxnParams(chain) {
  const params = await clientForChain(chain).getTransactionParams().do();
  //return params;
  console.log("para para ", params);
  return params;
}

function stringToChainType(s) {
  return s;
}
chainValue = stringToChainType("testnet");
// Subscribe to connection events

connectButton.addEventListener("click", () => {
  console.log("hello");
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }
  else{
    connectButton.style.display = "none";
  // Get provided accounts
  console.log("CONNECTOR",connector._accounts);
  const  accounts  = connector._accounts;
  senderAddress = accounts[0];
  console.log(senderAddress);
  document.getElementById(
    "senderAddress"
  ).textContent = `Connected Wallet: ${senderAddress}`;
  }
});

connector.on("connect", async (error, payload) => {
  if (error) {
    throw error;
  }
  connectButton.style.display = "none";
  // Get provided accounts
  console.log(payload);
  const { accounts } = payload.params[0];
  senderAddress = accounts[0];
  console.log(senderAddress);
  document.getElementById(
    "senderAddress"
  ).textContent = `Connected Wallet: ${senderAddress}`;
  // document.getElementById("contestantName").value =
  //   localStorage.getItem("contestant");
  // document.getElementById("contestantName").value =
  //   localStorage.getItem("contestant");
  // document.getElementById("receiverAddress").value =
  //   localStorage.getItem("receiver");
});

console.log("sender", senderAddress);

document.getElementById("txnForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("submit").textContent = "Loading...";
  document.getElementById("submit").setAttribute("disabled", true);
  txParams = await apiGetTxnParams(chainValue);

  //const txns=algosdk.Transaction();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: senderAddress,
    to: localStorage.getItem('address'),
    amount: document.getElementById("votes").value * 100,
    assetIndex: 21364625,
    suggestedParams: {
      note: "Voting with Choice Coin",
      type: "axfer", // ASA Transfer (axfer)
      fee: txParams["fee"],
      firstRound: txParams["firstRound"],
      lastRound: txParams["lastRound"],
      genesisID: txParams["genesisID"],
      genesisHash: txParams["genesisHash"],
      flatFee: txParams["flatFee"],
    },
  });
  console.log(txn);

  // Sign transaction
  // txns is an array of algosdk.Transaction
  const txnsToSign = [txn].map((txn) => {
    const encodedTxn = window.Buffer.from(
      algosdk.encodeUnsignedTransaction(txn)
    ).toString("base64");

    return {
      txn: encodedTxn,
      message: "Description of transaction being signed",
      // Note: if the transaction does not need to be signed (because it's part of an atomic group
      // that will be signed by another party), specify an empty singers array like so:
      // signers: [],
    };
  });

  const requestParams = [txnsToSign];
  console.log("requestParams:", requestParams);

  const request = formatJsonRpcRequest("algo_signTxn", requestParams);
  console.log("request:", request);

  const result = await connector.sendCustomRequest(request);
  console.log("result:", result);

  const decodedResult = result.map((element) => {
    return element
      ? new Uint8Array(window.Buffer.from(element, "base64"))
      : null;
  });
  const confirmedRound = await apiSubmitTransactions(
    "testnet",
    decodedResult[0]
  );
});
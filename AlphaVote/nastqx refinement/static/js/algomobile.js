import WalletConnect from "@walletconnect/client"; import QRCodeModal from "algorand-walletconnect-qrcode-modal"; import algosdk from "algosdk"; import { formatJsonRpcRequest } from "@json-rpc-tools/utils"; window.global = window; window.Buffer = window.Buffer || require("buffer").Buffer; const algodToken = "udWUnp68ls2xD7ZEDpYPc94EXLTwdDDg7YlOdEal"; const algodServer = "https://testnet-algorand.api.purestake.io/ps2"; const algodPort = ""; let senderAddress; let chainValue; let txParams; let AlgodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const Indexer = new algosdk.Indexer( algodToken, "https://testnet-algorand.api.purestake.io/idx2", algodPort ); const getTotalChoice3 = document.getElementById("choice_value"); //get value of choice contributed const CHOICE_ID = 21364625;

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

const get_address_history3 = document.getElementById("notify"); //get address and total choice value contributed
const submit3 = document.getElementById("submit"); //get submit button after connection
const connectWallet3 = document.getElementById("connect_wallet"); //get connect wallet button
const walletAddress3 = document.getElementById("wallet_value"); //get voter's wallet address
const notification3 = document.getElementById("notification"); //success notification upon connection
const disconnect = document.getElementById("disconnect");
const connectButton = document.getElementById("connect");

connectButton.addEventListener("click", async () => { if (!connector.connected) { // create new session
    connector.createSession();
  } else {
    // Get provided accounts
    console.log("CONNECTOR", connector._accounts); const accounts = connector._accounts; senderAddress = accounts[0]; console.log(senderAddress); walletAddress3.innerHTML = `${senderAddress}`;
    //get the last 5 transaction history of the connected address
    let transaction_history = await indexer
      .searchForTransactions()
      .address(senderAddress)
      .assetID(21364625)
      .limit(5)
      .do();

    let total = 0;
    const history = transaction_history["transactions"];
    history.forEach((item) => {
      total += item["asset-transfer-transaction"]["amount"] / 100;
    });
    getTotalChoice3.innerHTML += ` ${total.toFixed(2)} CHOICE`;

    get_address_history3.classList.remove("d-none");
    notification3.innerHTML = `You are now connected, Proceed to Vote now`;
    walletAddress3.innerHTML = `${senderAddress}`;
    connectWallet3.classList.add("d-none");
    disconnect.innerHTML = `Disconnect Wallet here`;
    submit3.innerHTML =
      '<button class="btn btn-primary text-white btn-md mt-3" id="vote" onclick="algoMobile()">Vote</button>';

    const addresses = accounts.map((item) => item);
    const address = accounts[0];

    localStorage.setItem("wallet-type", "walletconnect");
    localStorage.setItem("address", address);
    localStorage.setItem("addresses", addresses);
  }
});

connector.on("connect", async (error, payload) => {
  if (error) {
    throw error;
  }
  console.log(payload);
  const { accounts } = payload.params[0];
  console.log("CONNECTOR", accounts[0]);
  senderAddress = accounts[0];
  console.log(senderAddress);
  walletAddress3.innerHTML = `${senderAddress}`;

  //get the last 5 transaction history of the connected address
  let transaction_history = await indexer
    .searchForTransactions()
    .address(senderAddress)
    .assetID(21364625)
    .limit(5)
    .do();

  let total = 0;
  const history = transaction_history["transactions"];
  history.forEach((item) => {
    total += item["asset-transfer-transaction"]["amount"] / 100;
  });
  getTotalChoice3.innerHTML += ` ${total.toFixed(2)} CHOICE`;

  get_address_history3.classList.remove("d-none");

  notification3.innerHTML = `You are now connected, Proceed to Vote now`;
  walletAddress3.innerHTML = `${senderAddress}`;
  connectWallet3.classList.add("d-none");
  disconnect.innerHTML = `Disconnect Wallet here`;
  submit3.innerHTML =
    '<button class="btn btn-primary text-white btn-md mt-3" id="vote" onclick = "algoMobile()">Vote</button>';

  const addresses = accounts.map((item) => item);
  const address = accounts[0];

  localStorage.setItem("wallet-type", "walletconnect");
  localStorage.setItem("address", address);
  localStorage.setItem("addresses", addresses);
});
disconnect.addEventListener("click", () => { connector.killSession(); window.location.href = "/"; });




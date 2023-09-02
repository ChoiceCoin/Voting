/*import algosdk from "https://cdn.skypack.dev/@algosdk";
import WalletConnect from "https://cdn.skypack.dev/@walletconnect/client";
import QRCodeModal from "https://cdn.skypack.dev/@algorand-walletconnect-qrcode-modal";
//import {QRCodeModal} from "https://cdn.jsdelivr.net/npm/algorand-walletconnect-qrcode-modal@1.6.1/dist/cjs/index.min.js";
//import algosdk from "https://cdn.jsdelivr.net/npm/algosdk@1.12.0/dist/browser/algosdk.min.js"
import { formatJsonRpcRequest } from "https://cdn.skypack.dev/@json-rpc-tools/utils";
*/

/*
import "https://cdn.jsdelivr.net/npm/algosdk@1.12.0/dist/browser/algosdk.min.js";
import "https://cdn.jsdelivr.net/npm/@walletconnect/utils@1.7.0/dist/esm/index.min.js";
import "https://cdn.jsdelivr.net/npm/@walletconnect/browser-utils@1.7.0/dist/esm/index.min.js";
import "https://cdn.jsdelivr.net/npm/@walletconnect/core@1.7.0/dist/esm/index.min.js";
import "https://cdn.jsdelivr.net/npm/@walletconnect/client@1.7.0/dist/esm/index.min.js";
//import "https://cdn.skypack.dev/@walletconnect/client"

import "https://cdn.jsdelivr.net/npm/algorand-walletconnect-qrcode-modal@1.6.1/dist/cjs/index.min.js";
import "https://cdn.skypack.dev/@json-rpc-tools/utils";
*/



window.connectToWalletConnect = function () {
  const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

if (!connector.connected) {
  connector.createSession();
}
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }
  const { accounts } = payload.params[0];
});
connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }
  const { accounts } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }
});

}
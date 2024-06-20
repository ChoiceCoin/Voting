import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
export default function FirstPost() {
  // Create a connector
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L", //Your APi key here
  };
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });

  // Check if connection is already established
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }

  // Subscribe to connection events
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get provided accounts
    const { accounts } = payload.params[0];
    console.log(accounts);
    document.getElementById("add").innerHTML = accounts;
    document.getElementById("con").innerHTML = "Connected";
  });
  const amount = async () => {
    const addre = document.getElementById("add").innerText;
    const amt = await algoClient.accountInformation(addre).do();
    document.getElementById("algo").innerHTML = "Algo: " + amt.amount / 1000000;
  };

  connector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts
    const { accounts } = payload.params[0];
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
  });
  return (
    <>
      <div class="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
        <div class="h-60v w-full imge3-bg flex flex-col justify-between p-4"></div>

        <div class="p-4">
          <div class="flex items-center justify-between">
            <h1 class="text-gray-600 font-medium" id="algo"></h1>
            <button class="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <p class="text-gray-400 text-sm my-1" id="add"></p>
          <span
            id="con"
            class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium"
          >
            Disconnected
          </span>
          <div className="mt-10">
            <button
              onClick={amount}
              className="bg-red-300 p-2 border-2 rounded-xl"
            >
              Show Amout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

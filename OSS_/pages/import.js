import { useState } from "react";
import algosdk from "algosdk";
export default function Import() {
  //This helps in connecting the client with the algorand network
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L", //Your APi key here
  };
  const [name, setName] = useState(" ");
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  const handleInput = (event) => {
    setName(event.target.value);
  };
  const show = async () => {
    let secret_key = algosdk.mnemonicToSecretKey(name);
    document.getElementById("key").innerHTML = secret_key.addr;
    let info = await algoClient.accountInformation(secret_key.addr).do();
    document.getElementById("algo").innerHTML = info.amount / 1000000;
    document.getElementById("con").innerHTML = "Successfully Imported";
  };

  return (
    <>
      <div className="w-full flex justify-center p-2 bg-green-300">
        <input
          className="w-2/4 border-2 rounded-xl p-3"
          placeholder="Kindly enter your passpharse"
          id="inputTag"
          onChange={handleInput}
        ></input>
      </div>
      <div className="w-full flex justify-center p-2 bg-green-300">
        <button onClick={show} className="w-20v border-2 rounded-xl p-3">
          Import Wallet
        </button>
      </div>
      <div class="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
        <div class="h-60v w-full imge1-bg flex flex-col justify-between p-4"></div>

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
          <p class="text-gray-400 text-sm my-1" id="key"></p>
          <span
            id="con"
            class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium"
          >
            Not imported
          </span>
        </div>
      </div>
    </>
  );
}

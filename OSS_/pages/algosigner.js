import algosdk from "algosdk";
import algo from "../assets/algo.png";
import Image from "next/image";
import React, { useState } from "react";

export default function Algosigner() {
  const [count, setCount] = useState([]);
  let acs = "";
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L", //Your APi key here
  };
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  const algoSignerConnect = async () => {
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
        console.log(accounts);
        acs = accounts[0].address;
        document.getElementById("con").innerHTML = "Connected";
        let info = await algoClient.accountInformation(acs).do();
        document.getElementById("address").innerHTML =
          "Address: " + accounts[0].address;
        document.getElementById("algo").innerHTML =
          "ALGO: " + info.amount / 1000000;
        document.getElementById("btn").innerHTML = "Connected";
      }
    } catch (error) {
      console.log(error);
      alert("Algosigner is not set up yet");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center p-10">
        <h2
          onClick={algoSignerConnect}
          className="w-20v bg-red-300 text-center border-2 rounded-xl p-3"
          id="btn"
        >
          Connect Now
        </h2>
      </div>
      <div class="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
        <div class="h-60v w-full imge2-bg flex flex-col justify-between p-4">
          <div>
            <input type="checkbox" />
          </div>
        </div>

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
          <p class="text-gray-400 text-sm my-1" id="address"></p>
          <p class="text-gray-400 text-sm my-1" id="wordlist"></p>
          <span
            id="con"
            class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium"
          >
            Disconnected
          </span>
        </div>
      </div>
    </>
  );
}

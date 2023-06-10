import React from "react";
import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const MyAlgo = () => {
  const myAlgoWallet = new MyAlgoConnect();
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "", //Your APi key here
  };
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  async function connectToMyAlgo() {
    try {
      const accounts = await myAlgoWallet.connect();
      document.getElementById("address").innerHTML =
        "Address: " + accounts[0].address;
      let info = await algoClient.accountInformation(accounts[0].address).do();
      document.getElementById("algo").innerHTML =
        "ALGO: " + info.amount / 1000000;
      document.getElementById("talk").innerHTML = "Connected!";
      document.getElementById("connectBtn").innerHTML = "Connected";
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <div className="gena">
        <header className="left">
          <h2 className="pas" id="nft">
            Welcome to my AlgoSpace
          </h2>
          <button id="connectBtn" onClick={connectToMyAlgo}>
            Connect to MyAlgo
          </button>
          <h3 className="pas">Wallet Details</h3>
          <p id="passPharse"></p>
          <p id="address"></p>
          <p id="algo"></p>
          <p className="pas" id="talk">
            Disconnected
          </p>
        </header>
      </div>
    </>
  );
};

export default MyAlgo;

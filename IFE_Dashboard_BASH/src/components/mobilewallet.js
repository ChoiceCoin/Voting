import React from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";

const mobilewallet = () => {
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "", //Your APi key here
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
    document.getElementById("address").innerHTML = accounts;
    document.getElementById("connectBtn").innerHTML = "Connected";
  });
  const amount = async () => {
    const addre = document.getElementById("address").innerText;
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
      <div className="gena">
        <header className="left">
          <h2 className="pas" id="nft">
            Welcome to my AlgoSpace
          </h2>
          <h3 className="pas">Wallet Details</h3>
          <button onClick={amount}>Show Amout</button>
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

export default mobilewallet;

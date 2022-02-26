import algosdk from "algosdk";
import React from "react";

const Algosigner = () => {
  let acs = "";
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "", //Your APi key here
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
        document.getElementById("connectBtn").innerHTML = "Connected";
        let info = await algoClient.accountInformation(acs).do();
        document.getElementById("address").innerHTML =
          "Address: " + accounts[0].address;
        document.getElementById("algo").innerHTML =
          "ALGO: " + info.amount / 1000000;
        document.getElementById("talk").innerHTML = "Connected!";
      }
    } catch (error) {
      console.log(error);
      alert("Algosigner is not set up yet");
    }
  };
  return (
    <>
      <div className="mm">
        <div className="gena">
          <header className="left">
            <h2 className="pas" id="nft">
              Welcome to my AlgoSpace
            </h2>
            <button id="connectBtn" onClick={algoSignerConnect}>
              Connect to AlgoSigner
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
      </div>
    </>
  );
};

export default Algosigner;

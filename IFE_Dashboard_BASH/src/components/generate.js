import React from "react";
import algosdk from "algosdk";

const generate = () => {
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const Port = "";
  const token = {
    "X-API-Key": "", //Your APi key here
  };
  const generateAccts = async () => {
    try {
      let newAccount = algosdk.generateAccount(); // generates an acct
      let mnemonics = algosdk.secretKeyToMnemonic(newAccount.sk);
      let algoClient = new algosdk.Algodv2(token, algoServer, Port);
      let secret_key = algosdk.mnemonicToSecretKey(mnemonics);
      document.getElementById("passPharse").innerHTML = mnemonics;
      document.getElementById("address").innerHTML =
        "Address: " + secret_key.addr;
      document.getElementById("talk").innerHTML =
        "Successfully generate a new wallet, Click on signout to exit ";
      document.getElementById("generateBtn").innerHTML = "Sign Out";
      document.getElementById("generateBtn").style = "background-color: red";
      const amount = async () => {
        return await algoClient.accountInformation(newAccount.addr).do();
      };
      console.log(amount());
    } catch (error) {}
  };

  return (
    <>
      <div className="gena">
        <header className="left">
          <h2 className="pas" id="nft">
            Welcome to my AlgoSpace
          </h2>
          <h3 className="pas">
            Note: Back up your account using a recovery passphrase
          </h3>
          <p className="pas">
            Without your recovery passphrase, if you lose your device the app,
            you will parmanently lose access to your Algorand account.
          </p>
          <h3 className="pas">Passphrase</h3>
          <p id="passPharse"></p>
          <p id="address"></p>
          <p id="algo"></p>
          <p className="pas" id="talk">
            Click on generate if you agree to backup your passphrase
          </p>
          <button id="generateBtn" onClick={generateAccts}>
            Generate
          </button>
        </header>
      </div>
    </>
  );
};

export default generate;

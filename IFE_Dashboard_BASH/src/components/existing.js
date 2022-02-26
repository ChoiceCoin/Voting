import { React, useState } from "react";
import algosdk from "algosdk";

const Existing = () => {
  //This helps in connecting the client with the algorand network
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "", //Your APi key here
  };
  const [name, setName] = useState(" ");
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
  const handleInput = (event) => {
    setName(event.target.value);
  };
  const show = async () => {
    let secret_key = algosdk.mnemonicToSecretKey(name);
    document.getElementById("address").innerHTML =
      "Address: " + secret_key.addr;
    document.getElementById("passPharse").innerHTML = name;
    let info = await algoClient.accountInformation(secret_key.addr).do();
    document.getElementById("algo").innerHTML =
      "Algo: " + info.amount / 1000000;
    document.getElementById("importBtn").innerHTML = "Sign Out";

    document.getElementById("importBtn").style = "background-color: red";
    document.getElementById("talk").innerHTML = "Successfully Imported";
  };
  return (
    <>
      <div className="gena">
        <header className="left">
          <h2 className="pas" id="nft">
            Welcome to my AlgoSpace
          </h2>
          <h3 className="pas">Enter Passpharse</h3>
          <input
            placeholder="passphrase"
            id="pkey"
            onChange={handleInput}
          ></input>
          <h3 className="pas">Passphrase</h3>
          <p id="passPharse"></p>
          <p id="address"></p>
          <p id="algo"></p>
          <p className="pas" id="talk">
            Not yet imported
          </p>
          <button id="importBtn" onClick={show}>
            Import Wallet
          </button>
        </header>
      </div>
    </>
  );
};

export default Existing;

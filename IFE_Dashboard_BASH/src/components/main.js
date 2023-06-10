import "../App.css";
import algo from "../assets/algo.png";
import myAlgo from "../assets/myAlgo.png";
import algosigner from "../assets/algosigner.png";
import add from "../assets/add.png";
import down from "../assets/down.png";
import React from "react";
import { Link } from "react-router-dom";

const main = () => {
  return (
    <>
      <body>
        <header className="header">
          <h1>Welcome to AlgoSpace</h1>
        </header>
        <div className="start">
          <p>You need an Algorand wallet to continue</p>
          <br />
          <p>Get started now</p>
        </div>
        <div className="options">
          <h2 id="sg">Pick an Option</h2>
          <div className="elements">
            <div className="items">
              <img src={add} id="gen" alt="generate" />
              <Link to="/generate" id="g">
                Generate
              </Link>
            </div>
            <div className="items">
              <img src={down} id="gen" alt="import" />
              <Link to="/existing" id="g">
                Import
              </Link>
            </div>
            <div className="items">
              <img src={algosigner} id="gen" alt="algosigner" />
              <Link to="/algosigner" id="g">
                Algosigner
              </Link>
            </div>
            <div className="items">
              <img src={myAlgo} id="gen" alt="myAlgo" />
              <Link to="/myAlgo" id="g">
                My Algo
              </Link>
            </div>
            <div className="items">
              <img src={algo} alt="mobile wallet" />
              <Link to="/mobilewallet" id="g">
                Mobile Wallet
              </Link>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default main;

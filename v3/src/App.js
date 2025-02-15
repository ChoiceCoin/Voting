import './App.css';
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { useEffect } from 'react';
import logo from './Logo.png';

// perawallet instantiating
const perawallet = new PeraWalletConnect()

// algoClient
const algod_address = "https://node.algoexplorerapi.io" 
const algod_token = "" 
const headers = {"X-API-Key": algod_token }
const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);


//get address
const address = localStorage.getItem('address');


//MaintNet
const voteAddress5 = ''
const voteAddress6 = ''

//Asset ID
//TestNet
//const ASSET_ID = 22081217;
//MainNet
const ASSET_ID = 297995609;

// Algorand Wallet
// Wallet Connect
async function walletConnect() {
  const newAccounts= await perawallet.connect()
  localStorage.setItem("address", newAccounts[0]);
  window.location.reload()
  }
// wallet disconnect
const disconnect = () => {
  perawallet.disconnect()
  localStorage.removeItem("address");
  window.location.reload()
  }
//////////////////////////////////

/////////////////////////
const vote_transaction5 = async () => {
  try{
    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: voteAddress5,
      amount: 2000000,
      assetIndex: ASSET_ID,
      suggestedParams,
    });
    const optInTxn = [{txn : txn, signers: [address]}]
    const signedTxn = await perawallet.signTransaction([optInTxn])
    const success = await algodClient.sendRawTransaction(signedTxn).do();
    return success
  }
  catch(err){
    console.log(err)
    return false
  }
  }
/////////////
const vote_transaction6 = async () => {
  try{
    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: voteAddress6,
      amount: 2000000,
      assetIndex: ASSET_ID,
      suggestedParams,
    });
    const optInTxn = [{txn : txn, signers: [address]}]
    const signedTxn = await perawallet.signTransaction([optInTxn])
    const success = await algodClient.sendRawTransaction(signedTxn).do();
    return success
  }
  catch(err){
    console.log(err)
    return false
  }
  }

(async () => {
  let account_info7 = (await algodClient.accountInformation(voteAddress5).do());
  let asset_value7 = account_info7['assets']
  let asset_amount7 = asset_value7[0]["amount"]
  let asset_amount13 = asset_amount7 / 100
  document.getElementById('message8').textContent = asset_amount13 + "  Choice"

  let account_info29 = (await algodClient.accountInformation(voteAddress6).do());
  let asset_value29 = account_info29['assets']
  let asset_amount29 = asset_value29[0]["amount"]
  let asset_amount33 = asset_amount29 / 100
  document.getElementById('message9').textContent = asset_amount33 + "  Choice"

  if(asset_amount13 > asset_amount33){
    document.getElementById('message5').textContent = "Oracle Predicts Yes"
  } else if(asset_amount13 < asset_amount33){
    document.getElementById('message5').textContent = "Oracle Predicts No"
  } else if(asset_amount13 === asset_amount33){
    document.getElementById('message5').textContent = "Oracle Predicts Tie"
  } 
  })().catch(e => {
    console.log(e);
  });


// React functions must return a React component
function App() {
  useEffect(() => {
    perawallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        localStorage.setItem("address", accounts[0]);
      }
      perawallet.connector?.on("disconnect", () => {
        localStorage.removeItem("address");
      });
    })
    .catch((e) => console.log(e));
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <h1>
          <div id = "displaytext" style={{ color: "blue" }}> Choice Coin </div>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button id='button1' onClick={walletConnect}> Connect</button>
          <button id='button2' onClick={disconnect}> Disconnect</button>
          <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </p>
        </p>
        <div>
          <h3 id = "displaytext" style={{ color: "blue" }}> Should Choice Coin move more than 7 million Choice to Solana? </h3>
          <break>
          <h5 id='message5'></h5>
          <h4 id = "displaytext" style={{ color: "blue" }}> Voting ends November 1 at 12:00AM EST </h4>
        </break>
          <h4 id = "displaytext" style={{ color: "blue" }}> Yes </h4>
          <h5 id='message8'></h5>
          <div>
            <button id='button3' onClick={vote_transaction5}>Vote</button>
          </div>
          <h4 id = "displaytext" style={{ color: "blue" }}> No </h4>
          <h5 id='message9'></h5>
          <div>
            <button id='button3' onClick={vote_transaction6}>Vote</button>
          </div>
        </div>
        <break>
        <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </break>
      </header>
    </div>
  );

}
export default App
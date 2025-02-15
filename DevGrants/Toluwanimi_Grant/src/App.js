
import {useState} from "react";
import './App.css';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from "algosdk";
const myAlgoWallet = new MyAlgoConnect(); // new  instance of  MyAlgoConnect
window.acc ='' // stores accounts of users

function App() {
  const [userAddress,setUserAddress] = useState('') // stores users wallet address
  async function connectToMyAlgo() {
    // This function connects the voters wallet to my program, it brings up a pop up used to connect user's wallet
    try {
      const accounts = await myAlgoWallet.connect();
      const addresses = accounts.map(account => account.address);
      window.acc = accounts
      // if addresses is not empty, the cursor focuses on the input and display user's address
      if (addresses)
      {   
        // if the cureent error message is "connect to your wallet", a succesful connection removes that error message
        var error = document.getElementById("err");
        if (error.innerHTML == "Connect to your wallet")
        {
          error.innerHTML =""
          error.classList.add("d-none")
        }
        // focuses on the input automatically
        document.getElementById("amount").focus();

        // removes connect button and shows users address
        var connect = document.getElementById('connectBtn')
        connect.classList.add('d-none')
        var userAdd =document.getElementById('address')
        userAdd.classList.remove('d-none')
        setUserAddress(accounts[0].address)
      }
      
    // in case of an error in connection
    } catch (err) {
      console.error(err);
      alert("Connection error")
    }
    
  }
  function copyText()
  {
    // This function is used to copy users address to clipboard
    var copyText = document.getElementById("addressText");
    navigator.clipboard.writeText(copyText.innerHTML);
  }
  return (
    <div className="">
      <nav className="navbar justify-content-between pl-5 pr-5 shadow-sm">
        
        {/* <a href='/' className="navbar-brand d-block d-md-none"><img alt="text" src={logo} width="auto" height="50px"/></a> */}
        <span className="navbar-brand d-none d-md-block letter">
          {/* <img alt="text" src={logo} width="auto" height="50px"/>  */}
          &nbsp;Choice Coin Voting
        </span>
        <a href='/' className="navbar-brand d-block d-md-none letter">
          {/* <img alt="text" src={logo} width="auto" height="50px"/>  */}
          &nbsp;Choice
        </a>
        <span id="address" className="text-white d-none containerAddress">
          <span id="addressText" className="btn text-white addressBtn ">{userAddress}</span>
          <span>...&nbsp;</span>
          <button className=" integration-checklist__copy-button" onClick={copyText}><i className="fa fa-clone"></i></button>
        </span>
        <button id="connectBtn" className="btn btn-connect btn-outline-primary my-2 my-sm-0" onClick={connectToMyAlgo}>Connect Wallet</button>
        
      </nav>
      <div className="dropdown-divider bg-secondary"></div>
      <div className=" marginFix shadow-sm">
        {/* <img alt="text" id="welcome" src={welcome} width="100%" height="100%"/> */}
        
        
        <div id="wallet" className="text-white padIssue ">
            <div className="card color pl-5 pr-5 mb-5 pt-3 pb-5"> 
              <p>Issue Number: <span style={{fontWeight: "100"}}>AQUJDI4DJH68</span></p>
              <input type="text" className=" colorborder form-control" disabled value="Statement of Issue to be voted on:" />
            
            </div>
            <span className="mt-5">Amount</span>
            <input id="amount" type="number" className="form-control colorborder2 mt-2" placeholder='Input choice Amount'/>
            <div className="row text-center mt-3">
                <div className="col-6">
                    <p>Yes&nbsp;<input type="radio" id="yes" name="choice"/></p>
                </div>
                <div className="col-6">
                    <p>No&nbsp;<input type="radio" id="no" name="choice"/></p>
                </div>
                <small id="err" className="alert alert-danger mx-auto d-none"> </small>
            </div>
            <div className="text-center mt-3">
                <button onClick={vote} className="btn btn-lg btn-primary btn-color-blue">Submit</button>
            </div>
        </div>
        <div id="success" className=" text-center d-none " style={{height: "25em"}}>
            <div className="text-center centerSuccess">
                <i className="fa fa-check fa-5x text-success"></i><br/>
                <p className="text-success "><b>Succesfully Voted </b></p>
                <div id="id" className="textWrap text-white"></div><br />
                <i><div id="result" className="text-white "></div></i>
            </div>
        </div>
        
      </div>
    </div>
  );
}

function vote() // used for voting
{
  // if the wallet isn't connected, an error message "connect to wallet" is displayed(check the else statement)
  if (window.acc[0])
  {
  
    var amount = document.getElementById("amount").value
    // prevents user for voting if amount is empty
    if(amount == "")
    {
        var error = document.getElementById("err");
        error.classList.remove("d-none")
        error.innerHTML = "Enter an amount"
    }
    else
    {       
        var id_container =  document.getElementById("id");
        var result = document.getElementById("result");
        // if user picks yes, the coin is sent to the zero address
        // const algosdk = require('algosdk');
        
        // purestake api 
        const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
        const port = "";

        const token = {
          'X-API-key' : '',
        }
        let algodClient = new algosdk.Algodv2(token, baseServer, port);
        
        if (document.getElementById("yes").checked)
        { 
          (async() => {              
              let params = await algodClient.getTransactionParams().do();              
              const zero_address = ''
              let txn = {
                fee: 1000,
                type: 'axfer',
                from: window.acc[0].address, //sender
                to:  zero_address, // receiver
                amount: Number(amount)*100, // amount inputed by user,  amount*100 is because of the decimal
                firstRound: params.firstRound,
                lastRound: params.lastRound,
                genesisHash: params.genesisHash,
                genesisID: params.genesisID,
                assetIndex:21364625,
                assetName:'Choice Coin'
                
              };
              // user signs the transaction 
              myAlgoWallet.signTransaction(txn)
              .then((signedTxn) => {
                // after  succesfully signing, the coin is sent to the receiver's address
                algodClient.sendRawTransaction(signedTxn.blob).do()
                .then((txn) => {
                  // success message displaying transaction ID
                  id_container.innerHTML="Transaction ID: "+ signedTxn.txID
                  result.innerHTML = amount+" choice coin sent to zero address"
                  var element = document.getElementById("wallet");
                  element.classList.add("d-none");
                  var element2 = document.getElementById("success");
                  element2.classList.remove("d-none");  
                })
                .catch((err) => {
                  console.log(err)  
                  alert("Error in transaction") // triggered when an error occurs while sending the coin
                });
              })
              .catch((err) => {
                console.log(err)  
                alert("Error in transaction") // triggered when an error occurs while signing the transaction
              });
          })().catch(e => {
              console.log(e);
          }); 
        }        
        else if(document.getElementById("no").checked)
        {
          // if user picks no, the coin is sent to the one address
          (async() => {
            let params = await algodClient.getTransactionParams().do();
            const one_address = ''
            let txn = {
              fee: 1000,
                type: 'axfer',
                from: window.acc[0].address, //sender
                to:  one_address, // receiver
                amount: Number(amount)*100, // amount inputed by user, amount*100 is because of the decimal
                firstRound: params.firstRound,
                lastRound: params.lastRound,
                genesisHash: params.genesisHash,
                genesisID: params.genesisID,
                assetIndex:21364625,
                assetName:'Choice Coin'
            };      
            // user signs transaction  
            myAlgoWallet.signTransaction(txn)
            .then((signedTxn) => {
              // after succesfully signing, the coin is sent to the reciever's address
              algodClient.sendRawTransaction(signedTxn.blob).do()
              .then((txn) => {
                // success message displaying transaction ID
                id_container.innerHTML="Transaction ID: "+ signedTxn.txID
                result.innerHTML = amount+" choice coin sent to one address"
                var element = document.getElementById("wallet");
                element.classList.add("d-none");
                var element2 = document.getElementById("success");
                element2.classList.remove("d-none");
              })
              .catch((err) => {
                console.log(err)  
                alert("Error in transaction")  // triggered when an error occurs while sending the coin
              });                                 
            })
            .catch((err) => {
                console.log(err)  
                alert("Error in transaction") // triggered when an error occurs while signing the transaction
              });
          })().catch(e => {
              console.log(e);
          }); 
        }
        else
        {
          // ensure user picks either yes or no
          var error = document.getElementById("err");
          error.classList.remove("d-none")
          error.innerHTML = "Pick either YES or NO to vote"
        }
    }
            
  }
  else{
    // reminds user to connect to wallet
    var error = document.getElementById("err");
      error.classList.remove("d-none")
      error.innerHTML = "Connect to your wallet"
  }          
}
export default App;

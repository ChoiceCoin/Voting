// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// importing relevant files and dependencies
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client"; 
import './propose.scss'

//JSX Component Propose
const Propose = () => {
  // setting initial state
  const [minimumChoice, setMinimumChoice] = useState();
 // Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();
// Getting address from local storage
  const isThereAddress = localStorage.getItem("address");
  // Starting AlgoClient Instance
  const algod_token = {
    "X-API-Key": "AE6Ave7wNH8bKB1SiwutOakoTHreBlWZ9TMKElZs"
  }
  const algod_address = "https://mainnet-algorand.api.purestake.io/ps2";
  const headers = "";
  const ASSET_ID = 297995609;
  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  const walletType = localStorage.getItem("wallet-type");

  // Choice Coin Rewards Adrress
  // const rewardsAddress = 'ZW4E323O6W3JTTVCDDHIF6EY75HSU56H7AGD3UZI54XCQOMNRCWRTYP5PQ'
  const serviceAddress = 'WIOAXYVLJ6YQXS6RI2ROHXHQAKGYND56BY2A5O7ZV3C7GLRR2FCLIIR7VM'

  // myAlgowallet transaction
  const myAlgoSign = async (candidatesForElection) => {
    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });
    const suggestedParams = await algodClient.getTransactionParams().do();
    const note = "Title, Issue, Options, "
    // rewards 
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: isThereAddress,
      to: serviceAddress,
      amount: 1000000,
      assetIndex: ASSET_ID,
      note:note,
      suggestedParams,
    });

    const signedTxn = await myAlgoWallet.signTransaction(Txn);
    const SignedTx = signedTxn.map((txn) => {
          return txn.blob;
        });
        console.log(SignedTx)

   const resp = await algodClient.sendRawTransaction(SignedTx).do();
   if(resp) {
    const headers = {
      "x-authorization-id": "12345",
    };

    // add choice per vote input
    axios
      .post(
        `https://v2-testnet.herokuapp.com/elections/create`,
        {
          candidates: candidatesForElection,
          name: document.getElementById("governance_name").value,
          issue: document.getElementById("issue").value,
          option1: document.getElementById("option1").value,
          option2: document.getElementById("option2").value,
          rewards: document.getElementById("rewards").value,
          address: isThereAddress,
          status : 'pending',
          has_ended : false
        },
        { headers }
      )
      .then((response) => {
        dispatch({
          type: "alert_modal",
          alertContent: `${response.data.message} Thank you! Your proposal will be reviewed.`,
        });
      });
   }
    } catch(error) {
      console.log(error)
      dispatch({
        type: "alert_modal",
        alertContent: "Error.",
      });
    }
  }

  // AlgoSigner
  const myAlgosignerConnect = async (candidatesForElection) => {
    try {
      const myAccountInfo = await algodClient
      .accountInformation(
        !!isThereAddress && isThereAddress
      )
      .do();
    //service fee
     const txn1 =  algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: isThereAddress,
        to: serviceAddress,
        amount: 1000000,
        assetIndex: ASSET_ID,
        note:note,
        suggestedParams,
     });

        let Txns = []
            // eslint-disable-next-line
            txns.map((transaction) => {
              Txns.push({
                txn: window.AlgoSigner.encoding.msgpackToBase64(transaction.toByte()),
              });
            })
            const signedTxn = await window.AlgoSigner.signTxn(Txns);
            const SignedTx = signedTxn.map((txn) => {
            return  window.AlgoSigner.encoding.base64ToMsgpack(txn.blob);
            });
            const resp = await algodClient
              .sendRawTransaction(SignedTx).do();

              if(resp) {
                const headers = {
                  "x-authorization-id": "12345",
                };
                // add choice per vote input
                axios
                  .post(
                    `https://v2-testnet.herokuapp.com/elections/create`,
                    {
                      candidates: candidatesForElection,
                      name: document.getElementById("governance_name").value,
                      issue: document.getElementById("issue").value,
                      option1: document.getElementById("option1").value,
                      option2: document.getElementById("option2").value,
                      rewards: document.getElementById("rewards").value,
                      address: isThereAddress,
                      status : 'pending',
                      has_ended : false
                    },
                    { headers }
                  )
                  .then((response) => {
                    dispatch({
                      type: "alert_modal",
                      alertContent: `${response.data.message} Thank you! Your proposal will be reviewed.`,
                    });
                  });
                }

    }
    
  }

    //Pera Connect
  const algoMobileConnect = async (candidatesForElection) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    const suggestedParams = await algodClient.getTransactionParams().do();
    //service fee
     const txn1 =  algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: isThereAddress,
              to: serviceAddress,
              amount: minimumChoice * 100,
              assetIndex: ASSET_ID,
              note: note,
              suggestedParams,
            });
        })
        const requestParams = [Txn];
        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        const result = await connector.sendCustomRequest(request);
        const decodedResult = result.map((element) => {
          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
      const resp = await algodClient.sendRawTransaction(decodedResult).do();
      if(resp) {
        const headers = {
          "x-authorization-id": "12345",
        };
        // add choice per vote input
        axios
          .post(
            `https://v2-testnet.herokuapp.com/elections/create`,
            {
              candidates: candidatesForElection,
              name: document.getElementById("governance_name").value,
              issue: document.getElementById("issue").value,
              option1: document.getElementById("option1").value,
              option2: document.getElementById("option2").value,
              rewards: document.getElementById("rewards").value,
              address: isThereAddress,
              status : 'pending',
              has_ended : false
            },
            { headers }
          )
          .then((response) => {
            dispatch({
              type: "close_wallet"
            })
            dispatch({
              type: "alert_modal",
              alertContent: `${response.data.message} Thank you! Your proposal will be reviewed.`,
            });
          });
        }
    }
  }

// Building block
    return (
       <div className="propose">
           <div className="create_elt">
      <div className="create_elt_inn">
        <div className="crt_hd" style={{justifyContent: "center"}}>
          <p className="converter-header"> Create Proposal </p>
        </div>

        <div className="vote_sect">
          <div className="vote_sect_img">

          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Title</p>
            <input id="governance_name"
              type="text"
            />
            <p className="ensure_txt">
            The title for the issue.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Rewards</p>
            <input
              type="number" id="rewards"
            />
            <p className="ensure_txt">
            Rewards distributed to voters on the issue - 500,000.00 Choice minimum.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Issue</p>
            <input
              type="text"
              id="issue"
            />
            <p className="ensure_txt">
            The decision to be voted on.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 1</p>
            <input
              type="text"
              id="option1"
            />
            <p className="ensure_txt">
            First choice.
            </p>
          </div>
      
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 2</p>
            <input
              type="text"
              id="option2"
            />
            <p className="ensure_txt">
             Second choice.
            </p>
          </div>

            <br />

          <div className="crt_butt">
            <button onClick={createProposal}>Create Proposal</button>
            <p className="safety" style={{textAlign : "left"}}>
            <input
                style={{cursor : "pointer", marginRight: "5px"}}
                className="checkbox"
                type="checkbox"
                value={minimumChoice}
                onClick={() => setMinimumChoice(500000)}
              />
          By checking this box you agree to send a non-refundable amount of 1,000,000 Choice for processing this proposal and running this vote. Additionally, you agree to Choice Coin's <a href="https://github.com/ChoiceCoin/Compliance/blob/main/Terms_and_Conditions/TermsConditions.pdf" style={{fontSize: "11px", cursor: "pointer", marginLeft:"-5px", color:"blue"}}>Terms and Conditions</a> and the <a href="https://github.com/ChoiceCoin/v2/blob/main/ProposalPolicy/ChoiceCoinv2Policy.pdf" style={{fontSize: "11px", cursor: "pointer", marginLeft:"-5px", color:"blue"}}>Proposal Policy.</a>
            </p>
          </div>
        </div>

      </div>
    </div>
       </div>
    );
}

export default Propose;
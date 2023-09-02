// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing relevant files and dependencies
import $ from "jquery";
import axios from "axios";
import algosdk from "algosdk";
import { useState} from "react";
import "../../styles/electionlist.css";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
import WalletConnect from "@walletconnect/client"; 
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useDispatch, useSelector } from "react-redux";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

//JSX Component ElectionList
const ElectionList = () => {
  // Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();
  // Getting election state data from redux store
  const balance = useSelector((state) => state.status.balance);
  const addressNum = useSelector((state) => state.status.addressNum);
  const getElection = useSelector((state) => state.status.allElection);
  const getElectionNumber = useSelector((state) => state.status.eachElectionNumber)
  // Setting initial state
  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);
  // Getting address from local storage
  const isThereAddress = localStorage.getItem("address");
  // Getting wallet type from local storage
  const walletType = localStorage.getItem("wallet-type");
  // Setting each election data variable from redux state
  const each_election_data = [getElection[getElectionNumber]] 
  // Choice Asset ID
  const ASSET_ID =  297995609;

  // Getting election data result from database
  const { isLoading, error, data } = useQuery("elections", () =>
    axios.get(`https://v2-testnet.herokuapp.com/results/${each_election_data[0].candidates[0].electionID}`).then((response) => {
      console.log(response.data.data)
      if (response?.data?.data) { 
        setAddress1(response?.data?.data[each_election_data[0].candidates[0].address]);
        setAddress2(response?.data?.data[each_election_data[0].candidates[1].address]);
      }
    })
  );

// Starting algod Client
  const algodClient = new algosdk.Algodv2( {
    "X-API-Key": ""
  },
  "https://testnet-algorand.api.purestake.io/ps2",
  "");
  
  // My algo wallet vote transaction function
  /////////////////////////////////////////////
  const myAlgoSign = async (voteData) => {
    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });
    const suggestedParams = await algodClient.getTransactionParams().do();
    const amountToSend = voteData.amount * 100;
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: voteData.address,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
      });
    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    await algodClient.sendRawTransaction(signedTxn.blob).do();
      dispatch({
        type: "alert_modal",
        alertContent: "Your vote has been recorded.",
      });
    }
  };

  // Algosigner wallet vote transaction function
  /////////////////////////////////////////////////
  const algoSignerConnect = async (voteData) => {
    const suggestedParams = await algodClient.getTransactionParams().do();
    const amountToSend = voteData.amount * 100;
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: address,
          to: voteData.address,
          amount: amountToSend,
          assetIndex: ASSET_ID,
          suggestedParams,
        });
    const signedTxn = await window.AlgoSigner.signTxn([
        { txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()) },
        ]);
    await algodClient
        .sendRawTransaction(
        window.AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
        )
        .do();
        dispatch({
        type: "close_wallet"
         })
        // alert success
        dispatch({
          type: "alert_modal",
          alertContent: "Your vote has been recorded.",
        });
    }
  };

  // Pera wallet vote transaction function
  ////////////////////////////////////////////
  const algoMobileConnect = async (voteData) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    const suggestedParams = await algodClient.getTransactionParams().do();
    const amountToSend = voteData.amount * 100;   
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: voteData.address,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
    });
      const requestParams = [txnsToSign];
      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);
      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });
      await algodClient.sendRawTransaction(decodedResult).do();
      dispatch({
        type: "close_wallet"
      })
      dispatch({
        type: "alert_modal",
        alertContent: "Your vote has been recorded.",
      });
  };

  // Place vote function
  //////////////////////////
  const placeVote = (address, amount, election) => {
    if (walletType === "my-algo") {
      myAlgoSign({ address, amount, election });
    } else if (walletType === "algosigner") {
      algoSignerConnect({ address, amount, election });
    } else if (walletType === "walletconnect") {
      algoMobileConnect({ address, amount, election });
    }  
  };

  // If data is yet to be gotten from the data -- set a loading spinner
  if (isLoading)
    return (
      <div className="ptt_elt">
        <div className="ptt_elt_inn">
          <div className="ptt_hd">
            <p>participate By Voting</p>
          </div>

          <ul className="card_list">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "var(--wht)",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Loading</p>
              <BarLoader
                color= "#888"
                size={150}
                speedMultiplier="0.5"
              />
            </div>
          </ul>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  // else the data building block
  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p>participate by voting</p>
        </div>
        <ul className="card_list">
          {each_election_data?.map((slug, index) => {
            return (
              <div className="card_cont" key={index}>
                <div className="card_r1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_elt_img">
                        <img src="https://i.postimg.cc/pXn0NRzL/logo.gif" alt="" />
                    </div>
                    <div className="card_elt_tit">{slug.name}</div>
                  </div>
                </div>
                <div className="card_elt_desc">{slug?.issue}</div>
                {/* <div className="voting_ends">
                  Voting ends: June 15th 2022, 4:00PM EST
                </div> */}
                <div className="results">
                  <div className="resultsTit">Results</div>
                  <div className="results_cont">
                    <div className="optionButt">
                      <div className="optionButtDets">
                        <p>Option 1</p>
                        <p>{address1.toLocaleString()} <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className={`optRangeSlide ${(address1 > address2) ? "optRangeSlide1" :"optRangeSlide2"}`}
                          style={{
                            width: `calc(100% * ${
                              address1 / (address1 + address2)
                            })`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="optionButt">
                      <div className="optionButtDets">
                        <p>Option 2</p>
                        <p>{address2.toLocaleString()} <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className={`optRangeSlide ${(address2 > address1) ? "optRangeSlide1" :"optRangeSlide2"}`}
                          style={{
                            width: `calc(100% * ${
                              address2 / (address1 + address2)
                            })`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card_cand">
                { each_election_data[0].has_ended === false &&
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Amount to commit:</p>
                      <input
                        id="max"
                        type="number"
                        min="1"
                        placeholder='1'
                        className="amtToCommitInp"
                      />
                      {
                        isThereAddress ? 
                      (<p className="max"
                         onClick={getMaxVoteValue}>
                          max
                        </p>
                            ) : null
                      }
                    </div>
                  </div>
              }
                  <div className="vote_collap">
                    <div className="card_cand_hd">Options</div>
                 <ul className="vote_now_list">
                          <li>
                         { each_election_data[0].has_ended === false && 
                            <input
                              type="radio"
                              name="options"
                              value={each_election_data[0].candidates[0].address}
                            />
                         }
                            <p>{each_election_data[0].option1}</p>
                          </li>
                     <li>
                       { each_election_data[0].has_ended === false && 
                        <input
                          type="radio"
                          name="options"
                          value={each_election_data[0].candidates[1].address}
                        />
                       }
                        <p>{each_election_data[0].option2}</p>
                      </li>
                    </ul>
                    {
                  each_election_data[0].has_ended === false && 
                      <div className="rec_vote_cont">
                      <button
                        className="record_vote button"
                        onClick={(e) => {
                          var voteVal = $(e.target)
                            .closest(".card_cand")
                            .find(".vote_now_list");
                          var amountToSend = $(e.target)
                            .closest(".card_cand")
                            .find(".amtToCommitInp")
                            .val();
                          var amt = !!amountToSend
                            ? amountToSend
                            : 1;
                          placeVote(
                            $("input[name=options]:checked", voteVal).val(),
                            amt,
                            slug
                          );
                        }}
                      >
                        Submit Vote <i className="uil uil-mailbox"></i>
                      </button>
                    </div>
                    }
                  
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ElectionList;

import algosdk from "algosdk";
import "../styles/compliance.css";
import { useDispatch } from "react-redux";
import { ASSET_ID, ComplianceAddress} from "../constants";
import { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const perawallet = new PeraWalletConnect()

const Compliance = () => {
const dispatch = useDispatch();
 const isThereAddress = localStorage.getItem("address");
  const algod_token = {
    "X-API-Key": ""
  }
  const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
  const headers = "";
  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  const walletType = localStorage.getItem("wallet-type");
  const [equityValue, setEquityValue] = useState("default")
  const [decentralizationValue, setDecentralizationValue] = useState("default")
  const [participationValue, setParticipationValue] = useState("default")
  const [investmentValue, setInvestmentValue] = useState("default")
  const [utilityValue, setUtilityValue] = useState("default")
  const [purposeValue, setPurposeValue] = useState("default")
  const [controlValue, setControlValue] = useState("default")
  const [financialValue, setFinancialValue] = useState("default")

  useEffect(() => {
    perawallet
    .reconnectSession()
    .then((accounts) => {
      if (accounts.length) {
        localStorage.setItem("wallet-type", "walletconnect");
            localStorage.setItem("address", accounts[0]);
            localStorage.setItem("addresses", accounts)

      }
      perawallet.connector?.on("disconnect", () => {
        localStorage.removeItem("address");
        localStorage.removeItem("addresses");
        localStorage.removeItem("wallet-type");
        localStorage.removeItem("walletconnect");
      });
    })
    .catch((e) => console.log(e));
  }, [])

  const handleEquityChange = (e) => {
    setEquityValue(e.target.value)
    console.log(e.target.value)
  }
  const handleDecentralizationChange = (e) => {
    setDecentralizationValue(e.target.value)
    // console.log(e.target.value)
  }
  const handleParticipationChange = (e) => {
    setParticipationValue(e.target.value)
    // console.log(e.target.value)
  }
  const handleInvestmentChange = (e) => {
    setInvestmentValue(e.target.value)
    // console.log(e.target.value)
  }
  const handleUtilityChange = (e) => {
    setUtilityValue(e.target.value)
    // console.log(e.target.value)
  }
  const handlePurposeChange = (e) => {
    setPurposeValue(e.target.value)
    // console.log(e.target.value)
  }
  const handleControlChange = (e) => {
    setControlValue(e.target.value)
    // console.log(e.target.value)
  }
  const handleFinancialChange = (e) => {
    setFinancialValue(e.target.value)
    // console.log(e.target.value)
  }

const complianceDetails =
  [
    {
      value: "outstanding",
      score: 1,
    },
    {
      value: "good",
      score: 0.75,
    },
    {
      value: "acceptable",
      score: 0.5,
    },
    {
      value: "marginal",
      score: 0.25,
    },
    {
      value: "unacceptable",
      score: 0,
    },
  ]

  const craftComplianceScoreToBlockchain = async () => {
    const result = equityValue * decentralizationValue * participationValue * investmentValue * utilityValue * purposeValue * controlValue * financialValue
    const assetData = result ** (1/8)
    const percentage = assetData/1 * 100
    const address = !!isThereAddress && isThereAddress 
      const suggestedParams = await algodClient.getTransactionParams().do();
      const enc = new TextEncoder();
      const note = enc.encode(`Asset Compliance score is ${assetData}`);
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: ComplianceAddress,
        amount: minimumChoice,
        assetIndex: ASSET_ID,
        note : note,
        suggestedParams,
      });

    if(walletType === "walletconnect") {
       const optInTxn = [{txn : txn, signers: [address]}]
       console.log(optInTxn)
       const signedTxn = await perawallet.signTransaction([optInTxn])
       const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
       dispatch({
        type: "alert_modal",
        alertContent: `Asset Compliance Score is ${assetData.toFixed(4)}`,
        percentage: percentage.toFixed(3),
        txId : txId
      })  
     }
  };

  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd" >
          <p>Compliance Calculator</p>
        </div>
        <ul className="card_list">
              <div className="card_cont">
                <div className="card_r1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_elt_tit">Compliance for DeFi on Algorand</div>
                  </div>
                </div>
                <div className="card_elt_desc">The Choice Coin Compliance AI is an embedded system which formalizes human knowledge using natural language processing to statistically measure the probability that a particular asset may be considered a security.</div>
                <div className="voting_ends">Calculate your digital assets compliance.</div>
                <div className="card_cand">
                <div className="card_cand_hd">
                    <div className="amountToCommit"
                    >
                      <p>Does the asset represent an equity interest in a company?</p>
                       <select defaultValue={equityValue} onChange={handleEquityChange}>
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                      
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>How decentralized is the asset?</p>
                      <select id="decentralized" defaultValue={decentralizationValue} onChange={handleDecentralizationChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Do users actively participate in the network?</p>
                      <select id="participation"  defaultValue={participationValue} onChange={handleParticipationChange}  >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div  className="amountToCommit">
                      <p>Is the asset intentionally sold as an investment?</p>
                      <select id="investment" defaultValue={investmentValue} onChange={handleInvestmentChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option,index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Does the asset have utility?</p>
                      <select  defaultValue={utilityValue} onChange={handleUtilityChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Does the asset have an intended purpose?</p>
                      <select defaultValue={purposeValue} onChange={handlePurposeChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Does the asset give users control in decesion making for a network?</p>
                      <select defaultValue={controlValue} onChange={handleControlChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option, index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Does the asset offer financial derivatives?</p>
                      <select defaultValue={financialValue} onChange={handleFinancialChange} >
                      <option disabled value="default" >Please select one option.</option>
                      {complianceDetails.map((option,index) => (
                        <option key={index} value={option.score}>{option.value}</option>
                      ))}
                      </select>
                    </div>
                  </div>

                  <div className="v_inp_cov inpCont_cand">
              {/* <p>Conversion Fee</p> */}
              <p className="check">
              <input
                style={{cursor : "pointer"}}
                className="checkbox"
                type="checkbox"
                value={minimumChoice}
                onClick={() => setMinimumChoice(2)}
              />
               <span className="conditions" style={{fontSize : "13px"}}>Accept 2<span><img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '13px', marginTop : '0px', marginLeft : '0px'}} alt="logo"/> </span> is required to calculate asset compliance score</span>
              </p>
            
            </div>
                <div className="vote_collap">
                  <div className="rec_vote_cont">
                    <button
                      className="record_vote button"
                      onClick={() => {
                        calculate();
                      }}
                      >
                      Calculate <i className="uil uil-filter"></i>
                    </button>
                  </div>
                </div>
            </div>
            </div>
       </ul>
  )
};

Compliance();
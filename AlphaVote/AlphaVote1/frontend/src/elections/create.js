import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import axios from "axios";
import algosdk from "algosdk";
import "../styles/createelection.css";
import { URL } from "../constants";
const CreateElection = () => {
  // algod Client
  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const myAlgoWallet = new MyAlgoConnect();

  // wallet-type & address
  const walletType = localStorage.getItem("wallet-type");
  const walletAddress = localStorage.getItem("address");

  const dispatch = useDispatch();
  const [items, setitems] = useState([]);

  const [itemInp, setItemInp] = useState("");
  const [processTit, setProcessTit] = useState("");
  const [electionDescription, setElectionDesciption] = useState("");

  const [choiceToSend, setChoiceToSend] = useState(1);

  const hdImgPicker = useRef(null);
  const itemImgPicker = useRef(null);
  const [hdImg, setHdImg] = useState(null);
  const [itemImg, setItemImg] = useState(null);

  const addHeaderImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setHdImg(readerEvent.target.result);
    };
  };

  const addItemImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setItemImg(readerEvent.target.result);
    };
  };

  const addItem = () => {
    if (itemInp.trim().length > 0 && !items.includes(itemInp)) {
      setitems((prev) => [
        ...prev,
        { name: itemInp, image: itemImg ? itemImg : "" },
      ]);
      setItemInp("");
      setItemImg(null);
    }
    return;
  };

  const removeItem = (item) => {
    setitems(items?.filter((it) => it !== item));
  };

  const createCandidates = (candidates) => {
    const candidatesCred = [];
    for (let candidate of candidates) {
      const { sk: private_key, addr: address } = algosdk.generateAccount();
      candidatesCred.push({
        ...candidate,
        private_key: algosdk.secretKeyToMnemonic(private_key),
        address,
      });
    }

    return candidatesCred;
  };

  // send 1ALGO to all candidates
  const topUpCandidates = async (candidates) => {
    // array to store all txn object for all candidates
    const txns = [];
    const AMOUNT = 1000000;

    const suggestedParams = await algodClient.getTransactionParams().do();

    for (let candidate of candidates) {
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: walletAddress,
        to: candidate.address,
        amount: AMOUNT,
        suggestedParams,
      });
      txns.push(txn);
    }

    // get the group ID and assign to all transactions
    const groupID = algosdk.computeGroupID(txns);
    for (let i = 0; i < txns.length; i++) txns[i].group = groupID;

    // sign txns based on the wallet used to login
    let continueExecution = true;
    try {
      if (walletType === "algosigner") {
        const signedTxns = await window.AlgoSigner.signTxn(
          txns.map((txn) => ({
            txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()),
          }))
        );
        await algodClient
          .sendRawTransaction(
            signedTxns.map((txn) =>
              window.AlgoSigner.encoding.base64ToMsgpack(txn.blob)
            )
          )
          .do();
      } else if (walletType === "my-algo") {
        const signedTxns = await myAlgoWallet.signTransaction(
          txns.map((txn) => txn.toByte())
        );

        // send the transactions to the net.
        await algodClient
          .sendRawTransaction(signedTxns.map((txn) => txn.blob))
          .do();
      }
    } catch (error) {
      console.log(error);
      continueExecution = false;
    }

    return continueExecution;
  };

  const optinCandidates = async (candidates) => {
    // choice coin asset ID
    const assetIndex = 21364625;

    // amount of CHoice to send. `0` for Opt In
    const amount = 0;

    const suggestedParams = await algodClient.getTransactionParams().do();

    for (let candidate of candidates) {
      const transactionOptions = {
        from: candidate.address,
        to: candidate.address,
        closeRemainderTo: undefined,
        revocationTarget: undefined,
        amount,
        assetIndex,
        suggestedParams,
      };
      const txn =
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
          transactionOptions
        );

      const { _, sk } = algosdk.mnemonicToSecretKey(candidate.private_key);
      const signedTxn = txn.signTxn(sk);

      // send the transactions to the net.
      await algodClient.sendRawTransaction(signedTxn).do();
    }
  };

  // Create Election Function
  const createElection = async () => {
    // check if localStorage items were deleted.
    if (!walletType || !walletAddress) {
      dispatch({ type: "modal_connect" });
      return;
    }

    if (processTit.trim().length < 1) {
      alert("Process Title required!");
      return;
    }

    if (items.length < 2) {
      alert("Minimum of two candidates required!");
      return;
    }

    // check if the user has sufficient balance to go on with the transaction
    const accountInformation = await algodClient
      .accountInformation(walletAddress)
      .do();
    const myBalance = accountInformation.amount / 1000000;
    if (myBalance < items.length * choiceToSend + 1) {
      alert(
        "Your balance does not meet the requirement to create an election with specified candidates."
      );
      return;
    }

    const electionData = {
      process_image: hdImg ? hdImg : "",
      candidates: items,
      processTit,
      electionDescription,
      choiceToSend,
    };

    // create candidates address and secretKey
    const updatedCandidates = createCandidates(electionData.candidates);

    topUpCandidates(updatedCandidates).then((continueExecution) => {
      if (continueExecution) {
        optinCandidates(updatedCandidates).then(() => {
          const headers = {
            "X-Wallet-Address": walletAddress,
          };
          // add choice per vote input
          axios
            .post(
              `${URL}/elections/create`,
              {
                candidates: updatedCandidates,
                choice_per_vote: electionData.choiceToSend,
                process_image: electionData.process_image,
                title: electionData.processTit,
                description: electionData.electionDescription,
              },
              { headers }
            )
            .then((response) => alert(response.data.message));
        });
      }
    });

    // Reset Inputs
    // setitems([]);
    // setHdImg(null);
    // setItemInp("");
    // setProcessTit("");
    // setChoiceToSend(0);
    // setElectionDesciption("");

    // Can redirect here
  };

  return (
    <div className="create_elt">
      <div className="create_elt_inn">
        <div className="crt_hd">
          <p>Recently Created Elections</p>
        </div>

        {/* **************** */}
        <div className="vote_sect">
          <div className="vote_sect_img">
            <div className="vote_hd_img">
              {hdImg ? (
                <img src={hdImg} alt="" />
              ) : (
                <i className="uil uil-image" />
              )}
            </div>

            <input
              ref={hdImgPicker}
              hidden
              onChange={addHeaderImage}
              type="file"
              accept=".jpg, .jpeg, .png"
            />

            <div
              className="vote_add_img"
              onClick={() => hdImgPicker.current.click()}
            >
              <p>Add Election Header Image</p>
            </div>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Election Title</p>
            <input
              type="text"
              placeholder="eg. Best cryptocurrency"
              value={processTit}
              onChange={(e) => setProcessTit(e.target.value)}
            />
            <p className="ensure_txt">
              Entries must be of minimum length of one.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Election Description</p>
            <input
              type="text"
              placeholder="Describe process"
              value={electionDescription}
              onChange={(e) => setElectionDesciption(e.target.value)}
            />
            <p className="ensure_txt">
              A meaningful text to describe your election process.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Choice per vote</p>
            <input
              type="number"
              value={choiceToSend}
              min="1"
              onChange={(e) => setChoiceToSend(e.target.value)}
            />
            <p className="ensure_txt">
              Amount of $CHOICE required to participate in this election
            </p>
          </div>

          {/* ************** */}
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Candidates</p>
            <div className="add_item_sect">
              <div className="add_item_sect_r1">
                <input
                  type="text"
                  placeholder="Choice Coin"
                  value={itemInp}
                  onChange={(e) => setItemInp(e.target.value)}
                />

                <div className="item_img_preview">
                  {itemImg ? (
                    <img src={itemImg} alt="" />
                  ) : (
                    <i className="uil uil-image" />
                  )}
                </div>

                <input
                  ref={itemImgPicker}
                  hidden
                  onChange={addItemImg}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                />

                <div
                  className="add_butt"
                  onClick={() => itemImgPicker.current.click()}
                >
                  <p>Add Image</p>
                </div>
              </div>
              <p className="ensure_txt">
                Entries must be of minimum length of one.
              </p>
            </div>

            <div className="addItemButt" onClick={() => addItem()}>
              <p>Add Election Participant</p>
            </div>
          </div>

          {items?.map((item, index) => (
            <div className="item_list" key={index}>
              <div className="item_list_img">
                {item?.image ? (
                  <img src={item?.image} alt="" />
                ) : (
                  <i className="uil uil-asterisk" />
                )}
              </div>

              <div className="item_list_name">
                <p>{item.name}</p>
              </div>

              <div className="rm_butt" onClick={() => removeItem(item)}>
                <p>Delete Participant</p>
              </div>
            </div>
          ))}

          <br />

          <div className="crt_butt">
            <button onClick={createElection}>Create Election</button>
            <p className="safety">
              <span>Safety disclaimer :</span> We never store your data.
              Everything is encrypted.
            </p>
          </div>

          {/* ************** */}
        </div>

        {/* **************** */}
      </div>
    </div>
  );
};

export default CreateElection;

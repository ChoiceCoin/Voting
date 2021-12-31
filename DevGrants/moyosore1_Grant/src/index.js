const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "zHQtrZNbb25toMpt1Gc6l25BuxgNoELL2PxqST9G",
};

const algodClient = new algosdk.Algodv2(token, baseServer, port);

// asset Id for choice coin
const assetId = 21364625;

let note = "";

// choice coin amount
let amount = 1;
// contains the address Algosigner returns
let usersAddress = "";
// stores vote, either yes or no
let vote = "";

const one_address =
  "V6O5YY4QHHHJYLIS7P7SISDVFQW664UJXRAXMX5ZHGZRW6G2JUUICMYTSA";
const zero_address =
  "V6O5YY4QHHHJYLIS7P7SISDVFQW664UJXRAXMX5ZHGZRW6G2JUUICMYTSA";

// connects to user's wallet
window.connectToWallet = function () {
  // If AlgoSigner exists, we can call it

  if (typeof AlgoSigner !== "undefined") {
    AlgoSigner.connect()
      // finds the TestNet accounts currently in AlgoSigner
      .then(() =>
        AlgoSigner.accounts({
          ledger: "TestNet",
        })
      )
      .then((accountData) => {
        // the accountData object should contain the Algorand addresses from TestNet that AlgoSigner currently knows about
        usersAddress = accountData[0].address;
      })
      .catch((e) => {
        // handle errors and perform error cleanup here
        console.error(e);
      });
  }
};

// validates user input
window.validateVote = function () {
  // gets the value of choice coin amount passed by user
  const choice = document.forms["votingForm"]["amount"].value;

  const radioButton = document.querySelector("input[name=vote]:checked");

  // validates an actual choice coin amount was passed and that it's not lower or equal to zero
  if (choice == "" || choice <= 0) {
    alert("Put in a valid amount");
    return false;
  }

  // confirms that a vote was made
  if (!radioButton) {
    alert("A vote must be cast. Pick either yes or no");
    return false;
  }
  amount = choice;
  vote = radioButton.value;

  // calls the submitVote method when all data has been validated
  submitVote();
  return false;
};

//
window.submitVote = async function () {
  // address to send to
  let to = "";

  if (vote == "yes") {
    to = zero_address;
  } else {
    to = one_address;
  }

  if (usersAddress == "") {
    connectToWallet();
  }

  let params = await algodClient.getTransactionParams().do();

  // Construct the transaction
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: usersAddress,
    to: to,
    amount: Number(amount) * 100,
    assetIndex: assetId,
    suggestedParams: {
      note: `${amount * 100} sent to ${to}`,
      type: "axfer",
      fee: params.fee,
      firstRound: params.firstRound,
      lastRound: params.lastRound,
      genesisID: params.genesisID,
      genesisHash: params.genesisHash,
    },
  });

  const txnToSign = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

  const signedTxn = await AlgoSigner.signTxn([{ txn: txnToSign }]);

  const result = await AlgoSigner.send({
    ledger: "TestNet",
    tx: signedTxn[0].blob,
  });

  let mssg = `Transaction id is ${result.txId}`;
  alert(mssg);
};

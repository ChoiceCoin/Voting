/*
Choice Grants for Women
Issue: https://github.com/ChoiceCoin/Voting/issues/962
*/

const baseServer = "https://testnet.algoexplorerapi.io";
const algod_port = "";
const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const chain = "TestNet";
let address = "";

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port); // creates new instance of algosdk

const asset_id = 21364625; // Choice coin's ASA id on testnet
const address_zero = ""  // Put address zero private key here
const address_one = "";  // Put address one private key here

// This is to shorten the wallet address shown
function ellipseAddress(address = "", width = 6) {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

function connectWallet() {
  if (typeof AlgoSigner !== 'undefined') {
    AlgoSigner.connect().then(result => {
      // Connected to AlgoSigner
      AlgoSigner.accounts({ledger: chain})
          .then((accounts) => {
            address = accounts[0].address;
            document.getElementById("connect-button").classList.add("hide");
            document.getElementById("address").textContent = ellipseAddress(address);
            document.getElementById("address").classList.remove("hide");
          });
    });
  }
}

// Check if the input fields are valid to control whether the submit button is clickable
function checkForm() {
  if (!document.querySelector('input[name="vote"]:checked') ||
      document.getElementById("amount").value <= 0) {
        document.getElementById("submit").setAttribute("disabled", "");
      return;
  }
  document.getElementById("submit").removeAttribute("disabled");
}

// Form submission
async function submit() {
  const voteDecision = document.querySelector('input[name="vote"]:checked').value;
  
  let finalResult;
  const params = await algodClient.getTransactionParams().do();
  const amount = Number(document.getElementById("amount").value) * 100;
  // ternary is a much cleaner way for conditions than if else clauses
  const note = voteDecision === "yes" ? "Sent to address zero" : "Sent to address one";

  // Draft Asset Transfer transaction
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: address,
    to: voteDecision === "yes" ? address_zero : address_one,
    amount: amount, // in microAlgo
    assetIndex: asset_id,
    suggestedParams: {
      note: note,
      type: "axfer", // ASA Transfer (axfer)
      fee: params.fee,
      firstRound: params.firstRound,
      lastRound: params.lastRound,
      genesisID: params.genesisID,
      genesisHash: params.genesisHash,
      flatFee: params.flatFee,
    }
  });

  const txnToSign = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
  // Sign transaction with address
  const signedTxn = await AlgoSigner.signTxn([{txn: txnToSign}]);

  // Send signed Transaction
  const result = await AlgoSigner.send({
    ledger: chain,
    tx: signedTxn[0].blob
  });
  
  finalResult = {
    message:`${note}, Your Transaction ID: ${result.txId}`,
    transaction_id: result.txId
  }

  document.getElementById("message").textContent = finalResult.message;

  return finalResult;
}
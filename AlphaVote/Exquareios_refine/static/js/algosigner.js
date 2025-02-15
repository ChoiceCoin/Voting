const { AlgoSigner } = window;

const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const port = "";
const algoClient = new algosdk.Algodv2(token, server, port);

const indexer = new algosdk.Indexer(
  token,
  "https://testnet-algorand.api.purestake.io/idx2",
  port
);

const redInput2 = document.getElementById("red"); // get the red checkbox
const blueInput2 = document.getElementById("blue"); //get the blue checkbox
const getTotalChoice2 = document.getElementById("choice_value"); //get value of choice contributed
const get_address_history2 = document.getElementById("notify"); //get address and total choice value contributed
const submit2 = document.getElementById("submit"); //get submit button after connection
const connectWallet2 = document.getElementById("dropdownMenu2"); //get connect wallet button
const walletAddress2 = document.getElementById("wallet_value"); //get voter's wallet address
const disconnect = document.getElementById("disconnect");
let committed2 = document.getElementById("committed2");

const ASSET_ID = 21364625;

const address_one =
  "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address_two =
  "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";

const myAlgoSignerConnect = async () => {
  if (!AlgoSigner) {
    return alert("Please install AlgoSigner");
  }
  try {
    await AlgoSigner.connect();
    console.log(AlgoSigner);
    const address = await AlgoSigner.accounts({
      ledger: "TestNet",
    })
      .then((value) => value[0])
      .then((result) => {
        const { address } = result;
        return address;
      })
      .catch((e) => console.log("cannot retrieve accounts"));

    //get the last 5 transaction history of the connected address
    let transaction_history = await indexer
      .searchForTransactions()
      .address(address)
      .assetID(ASSET_ID)
      .limit(5)
      .do();

    let total = 0;
    const history = transaction_history["transactions"];
    history.forEach((item) => {
      total += item["asset-transfer-transaction"]["amount"] / 100;
    });

    disconnect.innerHTML = `Disconnect Wallet here`;
    get_address_history2.classList.remove("d-none");
    walletAddress2.innerHTML = `${address}`;

    committed.innerHTML = `Amount Commited to the Voting Process in the last five transactions: $${total} Choice`;
    getTotalChoice2.innerHTML += ` ${total.toFixed(2)} CHOICE`;
    connectWallet2.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
};

const algoSigner = async () => {
  //Check if blue address clicked
  if (blueInput2.checked) {
    const Address = walletAddress.innerHTML; //get blue wallet address
    let value = blueInput2.value;
    let Amount = Number(document.getElementById("option-input").value); // get choice amount
    try {
      let response = await algoSignerSend(value, Address, Amount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Check if red address checked
  if (redInput2.checked) {
    const Address = walletAddress.innerHTML; //get red wallet address
    let value = redInput2.value;
    let Amount = Number(document.getElementById("option-input").value); //get choice amount
    try {
      let response = await algoSignerSend(value, Address, Amount); //send value, wallet and amount to execute transaction
      if (response) {
        window.location.href = "/"; //redirect back to the homepage
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const algoSignerSend = async (opt, walletAddress, amount) => {
  let params = await algoClient.getTransactionParams().do();
  let encoder = new TextEncoder();

  if (opt == "blue") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        walletAddress,
        address_one,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        ASSET_ID,
        params
      );

      // Use the AlgoSigner encoding library to make the transactions base64
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);

      let sendTxn = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxn[0].blob,
      });

      return sendTxn;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        walletAddress,
        address_two,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        ASSET_ID,
        params
      );
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

      let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);

      let sendTxn = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxn[0].blob,
      });

      return sendTxn;
    } catch (error) {
      console.error(error);
    }
  }
};

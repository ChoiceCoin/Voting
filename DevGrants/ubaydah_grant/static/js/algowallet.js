const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key":"N4Kcpuyrax1L5ZsCYsOxQ5kI8gJk98Sc8H4uFUZN",
};

const Port = "";
const algodClient = new algosdk.Algodv2(Token, host, Port);
const indexerClient = new algosdk.Indexer(
  Token,
  "https://testnet-algorand.api.purestake.io/idx2",
  Port
);

const CHOICE_ASSET_ID = 21364625;

const address_1 = "KOXLGEBRWPXOJ4OOZYEBOBP77DCLY63EHODYGPWNPLL7ALWWIYWID75AVI";
const address_2 = "EN7X2JIPUXC4WYOJCDJDU5ITR5KWWZQ5PCJ3B6HWLGHBCWTJKBJGN7IH64";

const redInput = document.getElementById("red"); // get the yes checkbox
const blueInput = document.getElementById("blue"); //get the no checkbox
const getTotalChoice = document.getElementById("choice_value"); //get value of choice contributed
const get_address_history = document.getElementById("notify"); //get address and total choice value contributed
const submit = document.getElementById("submit"); //get submit button after connection
const connectWallet = document.getElementById("dropdownMenu2"); //get connect wallet button
const walletAddress = document.getElementById("wallet_value"); //get voter's wallet address
let committed = document.getElementById("committed2");
let primaryText = document.querySelector("primary-text");

const myAlgoConnect = new MyAlgoConnect();

const myAlgoWalletConnect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    const { address, name } = response[0]; //get name and address of the voter

    //get the last 5 transaction history of the connected address

    let transaction_history = await indexerClient
      .searchForTransactions()
      .address(address)
      .assetID(CHOICE_ASSET_ID)
      .limit(5)
      .do();

    let total = 0;
    const history = transaction_history["transactions"];
    history.forEach((item) => {
      total += item["asset-transfer-transaction"]["amount"] / 100;
    });

    get_address_history.classList.remove("d-none");
    walletAddress.innerHTML = `${address}`;
    getTotalChoice.innerHTML += ` ${total.toFixed(2)} CHOICE`;
    committed.innerHTML = `Amount Commited to the Voting Process in the last five transactions: $${total} Choice`;
    console.log(committed);
    connectWallet.classList.add("d-none");
    document.body.classList.remove("primary-text");
    disconnect.innerHTML = `Disconnect Wallet here`;
    console.log(walletAddress.innerHTML);
  } catch (error) {
    console.error(error);
  }
};

const myAlgoWalletSign = async () => {
  //Check if blue address clicked
  if (blueInput.checked) {
    const Address = walletAddress.innerHTML; //get blue wallet address
    let value = blueInput.value;
    let Amount = Number(document.getElementById("option-input").value); // get choice amount
    try {
      let response = await algoWalletSend(value, Address, Amount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Check if red address checked
  if (redInput.checked) {
    const Address = walletAddress.innerHTML; //get red wallet address
    let value = redInput.value;
    let Amount = Number(document.getElementById("option-input").value); //get choice amount
    try {
      let response = await algoWalletSend(value, Address, Amount); //send value, wallet and amount to execute transaction
      if (response) {
        window.location.href = "/"; //redirect back to the homepage
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const algoWalletSend = async (input, from, amount) => {
  let params = await algodClient.getTransactionParams().do();
  let encoder = new TextEncoder();
  if (input == "blue") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        address_1,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ASSET_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algodClient
        .sendRawTransaction(signedTxn.blob)
        .do();
      return response;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        address_2,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ASSET_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algodClient
        .sendRawTransaction(signedTxn.blob)
        .do();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};
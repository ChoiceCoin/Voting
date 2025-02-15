const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "udWUnp68ls2xD7ZEDpYPc94EXLTwdDDg7YlOdEal",
};

const Port = "";
const algodClient = new algosdk.Algodv2(Token, host, Port);
const indexerClient = new algosdk.Indexer(
  Token,
  "https://testnet-algorand.api.purestake.io/idx2",
  Port
);

const CHOICE_ASSET_ID = 21364625;

const address_1 = "UBZAMLEMJDAOPBCIP7HSSSPYZPEYEQ4GF6EAS2VGD6IYZ3XLM7KLECALLI";
const address_2 = "H2EXWO6ZKF7MEIYJGPHRNGSRPFC24J3BKCOO432WWOMI7EN43BDL3RF7CI";

const redInput = document.getElementById("red"); // get the red checkbox
const blueInput = document.getElementById("blue"); //get the blue checkbox
const getTotalChoice = document.getElementById("choice_value"); //get value of choice contributed
const get_address_history = document.getElementById("notify"); //get address and total choice value contributed
const submit = document.getElementById("submit"); //get submit button after connection
const connectWallet = document.getElementById("connect_wallet"); //get connect wallet button
const walletAddress = document.getElementById("wallet_value"); //get voter's wallet address
const notification = document.getElementById("notification"); //success notification upon connection

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
    notification.innerHTML = `You are now connected, Proceed to Vote now`;
    getTotalChoice.innerHTML += ` ${total.toFixed(2)} CHOICE`;
    connectWallet.classList.add("d-none");
    submit.innerHTML =
      '<button class="btn btn-primary text-white btn-md mt-3" id="submit" onclick="myAlgoWalletSign()">Submit</button>';
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

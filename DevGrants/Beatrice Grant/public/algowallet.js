const host = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
  "X-API-Key": "PU2fwcT4Yj9JUAo0ERRXm5eMkr4824Xx2IqMK8mQ",
};
const port = "";
const algodClient = new algosdk.Algodv2(token, host, port);

const address_1 = "EABDJ2MHJOHTHKCLZMRL35UNAPTJALDNPCG2BV2PIHZ3RLQJ6CINGP6YEA";
const address_2 = "WCPQRWTRH7BGDMBMU2FFAJLBP34WHNKF23LCWOWKQFIAZN6USVCHUOZYCA";

let redbutton = document.getElementById("red"); // get the red checkbox
let bluebutton = document.getElementById("blue"); //get the blue checkbox
const notify = document.getElementById("notify"); //get result from HTML Element
const notifyDiv = document.getElementById("notifications"); //get result div

const CHOICE_ID = 21364625;

const myAlgoConnect = new MyAlgoConnect();

const Connect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    const { address, name } = response[0]; //get name and address of the voter
    console.log(response.name);
    if (response) {
      notifyDiv.hidden = false;
      notify.textContent = `You are welcome ${name}, Address: ${address}.`;
    }
  } catch (error) {
    console.error(error);
  }
};

const myAlgoWalletSign = async () => {
  // check if redinput is checked
  if (redbutton.checked) {
    let value = red.value;
    console.log(value);
    let wallet_address = document.getElementById("wallet").value; //get red wallet address
    let redChoiceAmount = Number(document.getElementById("red-input").value); //get red choice amount
    let response = await algoWalletSendTransaction(
      value,
      wallet_address,
      redChoiceAmount
    );
    if (response) {
      window.location.href = "/";
    }
  } else {
    // check if blue input is checked
    if (bluebutton.checked) {
      let value = blue.value;
      let wallet_address = document.getElementById("wallet").value; //get blue wallet address
      let blueChoiceAmount = Number(
        document.getElementById("blue-input").value
      );

      let response = await algoWalletSendTransaction(
        value,
        wallet_address,
        blueChoiceAmount
      );
      if (response) {
        window.location.href = "/";
      }
    }
  }
};

const algoWalletSendTransaction = async (value, wallet_address, amount) => {
  let params = await algodClient.getTransactionParams().do(); //get params
  let encoder = new TextEncoder(); //encode
  if (value == "red") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        wallet_address,
        address_1,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algodClient
        .sendRawTransaction(signedTxn.blob)
        .do();
      return response;
    } catch (error) {
      result.textContent = error;
      console.log(error);
    }
  } else {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        wallet_address,
        address_2,
        undefined,
        undefined,
        amount * 100,
        encoder.encode("Vote with Choice coin"),
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algodClient
        .sendRawTransaction(signedTxn.blob)
        .do();
      return response;
    } catch (error) {
      result.textContent = error;
      console.log(error);
    }
  }
};

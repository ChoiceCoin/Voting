const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const Port = "";
const algoClient = new algosdk.Algodv2(Token, host, Port);

const CHOICE_ID = 21364625;

const address_1 = "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address_2 = "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";

const redInput_2 = document.getElementById("red"); // get the red checkbox
const blueInput_2 = document.getElementById("blue"); //get the blue checkbox

const myAlgoConnect = new MyAlgoConnect();

const myAlgoWalletConnect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    console.log(response);
    window.location.href = "/algowallet";
  } catch (error) {
    console.error(error);
  }
};

const myAlgoWalletSign = async () => {
  //to be fixed, null was returned for blueInput and redInput
  const redInput_2 = document.getElementById("red");
  const blueInput_2 = document.getElementById("blue");

  //Check if blue address checked
  if (blueInput_2.checked) {
    const wallet = document.getElementById("wallet-address").value; //get blue wallet address
    let value = blueInput_2.value;
    let blueAmount = Number(document.getElementById("blue-input").value); // blue choice amount
    try {
      let response = await algoWalletSend(value, wallet, blueAmount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Check if red address checked
  if (redInput_2.checked) {
    const wallet = document.getElementById("wallet-address").value; //get red wallet address
    let value = redInput_2.value;
    let redAmount = Number(document.getElementById("red-input").value); //red choice amount
    try {
      let response = await algoWalletSend(value, wallet, redAmount);
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const algoWalletSend = async (input, from, amount) => {
  let params = await algoClient.getTransactionParams().do();
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
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algoClient.sendRawTransaction(signedTxn.blob).do();
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
        CHOICE_ID,
        params
      );
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const response = await algoClient.sendRawTransaction(signedTxn.blob).do();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

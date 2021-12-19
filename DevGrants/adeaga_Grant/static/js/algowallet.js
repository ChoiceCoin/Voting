const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "fcZLveIsMp1TsjZs5itWl3MVLA4GAQBz4XBUCsZ3",
};

const Port = "";
const algodClient = new algosdk.Algodv2(Token, host, Port);
const indexerClient = new algosdk.Indexer(
  Token,
  "https://testnet-algorand.api.purestake.io/idx2",
  Port
);

const CHOICE_ASSET_ID = 21364625;

const address_1 = "GOIZ5PQCOYBDL22WILT3CRMWJA23QNPFHFKRRXLIJIFBARLN6ZPCSZIU2M";
const address_2 = "UVH6KD25LOBGWNY7EXVFWUFQQDZAWETVJCBIC5BDO2LIEQA2K4XWWYIVII";

const red = document.getElementById("red"); // get the red checkbox
const blue = document.getElementById("blue"); //get the blue checkbox
const submit = document.getElementById("submit"); //get submit button after connection
const walletAddress = document.getElementById("wallet_value"); //get voter's wallet address
const myAlgoConnect = new MyAlgoConnect();
const connectWallet = document.getElementById("submit2"); //get connect wallet button

const myAlgoWalletConnect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    const { address, name } = response[0]; //get name and address of the voter
    walletAddress.value = `${address}`;
    connectWallet.classList.add("d-none");
    console.log(walletAddress.innerHTML);
  } catch (error) {
    console.error(error);
  }
};

const myAlgoWalletSign = async () => {
  //Check if blue address clicked
  if (blue.checked) {
    const Address = walletAddress.innerHTML; //get blue wallet address
    let value = blue.value;
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
  if (red.checked) {
    const Address = walletAddress.innerHTML; //get red wallet address
    let value = red.value;
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

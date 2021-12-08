const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const Port = "";
const algoClient = new algosdk.Algodv2(Token, host, Port);

const CHOICE_ID = 21364625;

const address_1 = "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address_2 = "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";

let input = document.getElementsByTagName("input");

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
  let from = document.getElementById("wallet-address").value;
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      let value = input[i].value;
      try {
        let response = await algoWalletSend(value, from);
        if (response) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const algoWalletSend = async (input, from) => {
  let params = await algoClient.getTransactionParams().do();
  let encoder = new TextEncoder();
  if (input == "zero") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        address_1,
        undefined,
        undefined,
        100,
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
        100,
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

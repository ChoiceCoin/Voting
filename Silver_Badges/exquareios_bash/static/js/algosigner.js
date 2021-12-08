const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const ASSET_ID = 21364625;

const address_one =
  "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address_two =
  "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";

let option = document.getElementsByTagName("input");

const Connect = async () => {
  let response = await AlgoSigner.connect();
  window.location.href = "/algosigner";
};

const algoSigner = async () => {
  let walletAddress = document.getElementById("wallet-address").value;
  for (let i = 0; i < option.length; i++) {
    if (option[i].checked) {
      let value = option[i].value;
      try {
        let response = await AlgoSignerSend(value, walletAddress);
        if (response) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const AlgoSignerSend = async (opt, walletAddress) => {
  let params = await algodclient.getTransactionParams().do();
  let encoder = new TextEncoder();

  if (opt == "blue") {
    try {
      let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
        walletAddress,
        address_one,
        undefined,
        undefined,
        100,
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
        100,
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

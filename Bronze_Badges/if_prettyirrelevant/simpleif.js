const algosdk = require("algosdk");
const inquirer = require("inquirer");

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "",
};
const algodClient = new algosdk.Algodv2(token, baseServer, port);

// Choice Coin ASA ID
const assetID = 21364625;

// three addresses required for the task
const addressZero = "";
const addressOne = "";
const addressTwo = "";
const { sk: addressTwoPrivateKey } = algosdk.mnemonicToSecretKey("");

// Amount to send
const amountToSend = 1;

// Application Entrypoint
const main = () => {
  inquirer
    .prompt([{ message: "Please enter 0 or 1:", name: "response" }])
    .then(async (answers) => {
      const questionResponse = answers.response;
      const txnParams = await algodClient.getTransactionParams().do();

      const txnNote = algosdk.encodeObj({ message: "Bronze Bonus Bash" });
      if (questionResponse === "0") {
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          addressTwo,
          addressZero,
          undefined,
          undefined,
          amountToSend,
          txnNote,
          assetID,
          txnParams
        );

        const signedTxn = txn.signTxn(addressTwoPrivateKey);
        const txnResponse = await algodClient
          .sendRawTransaction(signedTxn)
          .do();

        console.log(
          `${amountToSend} CHOICE sent from ${hideAddress(
            addressTwo
          )} to ${hideAddress(addressZero)}\nTransaction ID: ${txn
            .txID()
            .toString()}`
        );
      } else if (questionResponse === "1") {
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          addressTwo,
          addressOne,
          undefined,
          undefined,
          amountToSend,
          txnNote,
          assetID,
          txnParams
        );

        const signedTxn = txn.signTxn(addressTwoPrivateKey);
        const txnResponse = await algodClient
          .sendRawTransaction(signedTxn)
          .do();

        console.log(
          `${amountToSend} CHOICE sent from ${hideAddress(
            addressTwo
          )} to ${hideAddress(addressOne)}\nTransaction ID: ${txn
            .txID()
            .toString()}`
        );
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Cannot render prompt in this environmet");
      } else {
        console.log("An error occured");
        console.log(error);
      }
    });
};

// utility function to hide addresses
const hideAddress = (string) => {
  return string.substring(0, 5) + "X".repeat(53);
};

main();

const algosdk = require("algosdk");
var fs = require("fs");
var json2xls = require("json2xls");
const filename = "sample.xlsx";

const algoServer = "https://mainnet-algorand.api.purestake.io/idx2";
const algoPort = "";
const token = {
  "X-API-Key": "Uio5HbK0Gp3wNKHiNx4jQ39HWZrbWAxfPvMMd6ca", //Your APi key here
};

let algodClient = new algosdk.Indexer(token, algoServer, algoPort);

const waitForConfirmation = async function (algodClient, txId, timeout) {
  if (algodClient == null || txId == null || timeout < 0) {
    throw new Error("Bad arguments");
  }

  const status = await algodClient.status().do();
  if (status === undefined) {
    throw new Error("Unable to get node status");
  }

  const startround = status["last-round"] + 1;
  let currentround = startround;

  while (currentround < startround + timeout) {
    const pendingInfo = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    if (pendingInfo !== undefined) {
      if (
        pendingInfo["confirmed-round"] !== null &&
        pendingInfo["confirmed-round"] > 0
      ) {
        //Got the completed Transaction
        return pendingInfo;
      } else {
        if (
          pendingInfo["pool-error"] != null &&
          pendingInfo["pool-error"].length > 0
        ) {
          // If there was a pool error, then the transaction has been rejected!
          throw new Error(
            "Transaction " +
              txId +
              " rejected - pool error: " +
              pendingInfo["pool-error"]
          );
        }
      }
    }
    await algodClient.statusAfterBlock(currentround).do();
    currentround++;
  }

  throw new Error(
    "Transaction " + txId + " not confirmed after " + timeout + " rounds!"
  );
};

// /indexer/javascript/AccountInfo.js
// (async () => {
//   let acct = "7WENHRCKEAZHD37QMB5T7I2KWU7IZGMCC3EVAO7TQADV7V5APXOKUBILCI";
//   let accountInfo = await algodClient.lookupAccountByID(acct).do();
//   console.log(
//     "Information for Account: " + JSON.stringify(accountInfo, undefined, 2)
//   );
// })().catch((e) => {
//   console.log(e);
//   console.trace();
// });
function filter(num) {
  console.log(num["sender"]);
  console.log(num["payment-transaction"]["amount"]);
}
(async () => {
  let currencyGreater = 10;
  let transactionInfo = await algodClient
    .searchForTransactions()
    .address("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
    .currencyGreaterThan(currencyGreater)
    .do();
  const arr = transactionInfo.transactions;
  arr.map(filter);
  const arra = [];
  arr.forEach((element) => {
    arra.push([element["sender"], element["payment-transaction"]["amount"]]);
  });
  var xls = json2xls(arra);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });

  //   fs.writeFile(
  //     "index.json",
  //     JSON.stringify(arr, undefined, 2),
  //     function (err, result) {
  //       if (err) console.log("error", err);
  //     }
  //   );
})().catch((e) => {
  console.log(e);
  console.trace();
});
var convert = function () {
  var xls = json2xls(allUsers);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });
};

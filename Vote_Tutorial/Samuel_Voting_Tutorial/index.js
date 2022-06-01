// all examples are portrayed using commonJs;

const algosdk = require('algosdk'); //importing algosdk
const prompt = require('prompt-sync')(); //importing nodeJs  prompt to enable prompt in a nodeJs environment

// open a purestaker api and get a unique API KEY
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "" //your API key gotten from purestake API, 
};
const algodClient = new algosdk.Algodv2(token, server, port); //connecting to algodclient

// create a testnet account with myalgowallet, keep the mmemonic key;
const mnemonic = ""; //the mmemonic 25 characters seperated by a whitespace should be imported here

// get account from mmemonic key;
const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 

//choice coin asset ID 
const ASSET_ID = 21364625

// voting address
const voting_address_0 = ""; //input a voting address wallet you can send choice to, make sure choice is opt-in to receive votes
const voting_address_1 = ""; //input the second voting address wallet you can send choice to, make sure choice is opt-in to receive votes

//Press '1' to vote for candidate 'one' and '0' to vote for candidate 'Zero"
const chooseVotingOption = async (voting_address_0, voting_address_1) => {
  const candidateOption = prompt(
    "Press 0 for candidate Zero or Press 1 for candidate One:"
  ); //please vote for a candidate
  const amount = prompt("Please enter Amount to commit to voting:");

  const params = await algodClient.getTransactionParams().do(); //get params
  const encoder = new TextEncoder(); //message encoder

  // if there is no valid option
  if (!candidateOption) {
    console.log("Please select a valid candidate option");
  } else if (!Number(amount)) {
    console.log("Please Enter A valid Choice token amount to vote");
  }
  // if your option is candidate zero
  else if (candidateOption == "0") {
    try {
      let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        recoveredAccount.addr,
        voting_address_0,
        undefined,
        undefined,
        Number(amount),
        encoder.encode("Voting with Choice coin"),
        ASSET_ID,
        params
      );

      let signedTxn = txn.signTxn(recoveredAccount.sk);
      const response = await algodClient.sendRawTransaction(signedTxn).do();
      if (response) {
        console.log(
          `You just voted for candidate Zero,Your voting ID: ${response.txId}`
        );
        // wait for confirmation
        waitForConfirmation(algodClient, response.txId);
      } else {
        console.log("error voting for candidate Zero, try again later");
      }
    } catch (error) {
      console.log("error voting for candidate Zero, Try again later");
    }
  }
  // if your option is candidate one
  else if (candidateOption == "1") {
    try {
      let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        recoveredAccount.addr,
        voting_address_1,
        undefined,
        undefined,
        Number(amount),
        encoder.encode("Voting with Choice coin"),
        ASSET_ID,
        params
      );
      let signedTxn = txn.signTxn(recoveredAccount.sk);
      const response = await algodClient.sendRawTransaction(signedTxn).do();
      if (response) {
        console.log(
          `You just voted for candidate One,Your voting ID: ${response.txId}`
        );
        // wait for confirmation
        waitForConfirmation(algodClient, response.txId);
      } else {
        console.log("error voting for candidate one, try again later");
      }
    } catch (error) {
      console.log("Error voting for candidate One, Try again later");
    }
  }
};

chooseVotingOption(voting_address_0, voting_address_1);

//verification function
const waitForConfirmation = async function (algodClient, txId) {
    let lastround = (await algodClient.status().do())['last-round'];
     while (true) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
          //Got the completed Transaction
          console.log('Voting confirmed in round ' + pendingInfo['confirmed-round']);
          break;
        }
        lastround++;
        await algodClient.statusAfterBlock(lastround).do();
     }
 };
 

// check account balance
const checkBalance = async () => {
    
    
  //get the account information
    const accountInfo =  await algodClient.accountInformation(recoveredAccount.addr).do();
    const assets =  accountInfo["assets"];
    
    //get choice amount from assets
     assets.map(asset => {
        if (asset['asset-id'] === ASSET_ID) {
            const amount = asset["amount"];
            const choiceAmount = amount / 100;
            console.log(
                `Account ${recoveredAccount.addr} has ${choiceAmount} $choice`
              );
              return;
        }  else {
            console.log(`Account ${recoveredAccount.addr} must opt in to Choice Coin Asset ID ${ASSET_ID}`);
          }
     })

  };

checkBalance();


// Calculate the result of a voting process.
const calculateVotes = async (addresses) => {
  const results = [];
  for (var i = 0; i < addresses.length; i++) {
    const optionAccountInfo = await algodClient
      .accountInformation(addresses[i])
      .do();
    //get the account information
    const assets = optionAccountInfo["assets"];

    //Check if choice coin is opted in
    assets.map((asset) => {
      if (asset["asset-id"] != CHOICE_ASSET_ID) return false;
      else {
        const amount = asset["amount"];
        const choiceAmount = amount / 100;
        results.push(choiceAmount);
      }
    });
  }
  console.log(results);
  return results;
};

// Selects a winner based on the result.
const winner = (voting_address_zero_count, voting_address_one_count) => {
  if (voting_address_zero_count > voting_address_one_count)
    console.log("Option zero wins.");
  else if (voting_address_zero_count < voting_address_one_count)
    console.log("Option one wins.");
};

const results = calculateVotes([voting_address_0, voting_address_1]);
winner(results[0], results[1]);

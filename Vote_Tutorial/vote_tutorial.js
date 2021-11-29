// Voting using Choice Coin
// A map to building decision software on Algorand
// Overview
////////////////////////////////////////////////////////////////////
// This Tutorial is a guide to building voting technology on Algorand using Choice Coin.
// Choice Coin is an Algorand Standard Asset (ASA) for solving the decentralized governance problem, which refers to the lack of a secure and autonomous process for decentralized organizations to make decisions.
// This Tutorial focuses on getting started with Decentralized Decisions, an open source voting software powered by Choice Coin.
// Requirements
////////////////////////////////////////////////////////////////////
// All requirements for this Tutorial can be found in the [package.json](https://github.com/ChoiceCoin/Voting/blob/main/package.json) file on the Choice Coin GitHub.
// To install the requirements run:
//npm install
//npm install algosdk@1.11.0
// Background
////////////////////////////////////////////////////////////////////
// Collective decision making is an important and essential part of groups across the world.
// Governments, corporations, charities, and many other organizations use voting as a means for making decisions impacting collections of people. Indeed, voting happens across industry – from corporate shareholder meetings to political elections.
// Fundamentally, voting is a method by which collective information is processed to determine consensus and make decisions.
// The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. More and more, organizations developing projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. Contrary to centralized systems, which are inherently hierarchical and pyramid like in nature, decentralized systems distribute power and decision making across global networks in a fair fashion. Thus, there exists a need for a way decentralized organizations can make decisions across distributed ledgers.
// Decentralized Decisions is a software designed to meet this need and provide a ready to use decentralized voting application using Choice Coin on the Algorand Network.
// The Decentralized Decisions software is open source and available on GitHub.
// The main programming language used for Decentralized Decisions development is Python, however the software may be written in other languages too, such as JavaScript.
// Steps
////////////////////////////////////////////////////////////////////
// 1. Import Algorand JS-SDK
// Start by importing the necessary dependencies from the Algorand JS-SDK.
const algosdk = require("algosdk");
const inquirer = require("inquirer");

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "",
};
const algodClient = new algosdk.Algodv2(token, baseServer, port);

// 3. Set Voting Variables
// Set the variables for voting using Choice Coin and for the specific voter's Algorand address.
const ASSET_ID = 42771692;
const voter_address = "";
const voter_phrase = algosdk.mnemonicToSecretKey("");

// 4. Vote
// The `vote` function allows voters to make a vote between two choices, zero and one.
//  The code block presents the voter with a choice to `Vote 0 for zero and vote 1 for one`.
//  These variables may be changed to correspond with many different options, such as candidates in an election, an approval on a decentralized autonomous organization (DAO) proposal, or whether to appoint a new board member in a corporation.
const vote = () => {
  inquirer
    .prompt(["Vote o for Zero and Vote 1 for One:"])
    .then(async (answers) => {
      const voter = answers[0];
      const params = await algodClient.getTransactionParams().do();
      if (voter === "1") {
        const amount = 100;
        const vote_address = "";
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          voter_address,
          vote_address,
          undefined,
          undefined,
          amount,
          "Vote Using Choice Coin",
          ASSET_ID,
          params
        );
        const signedTxn = txn.signTxn(voter_phrase);
        const result = await algodClient.sendRawTransaction(signedTxn).do();

        console.log(`Thanks for voting for one! \nTxn ID: ${result.txId}`);
      } else {
        const amount = 100;
        const vote_address = "";
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
          voter_address,
          vote_address,
          undefined,
          undefined,
          amount,
          "Vote Using Choice Coin",
          ASSET_ID,
          params
        );
        const signedTxn = txn.signTxn(voter_phrase);
        const result = await algodClient.sendRawTransaction(signedTxn).do();

        console.log(`Thanks for voting for zero! \nTxn ID: ${result.txId}`);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Cannot render prompt in this environmet");
      } else {
        console.log("An error occured");
      }
    });
};
vote();

// Here, the two `vote_address` variables refer to the respective choices available, so they should each be set to different addresses.
// In turn, the respective addresses may correspond with any two choices which may be voted upon and more addresses may be added to accommodate additional selection options.

// 5. Check Results
// //The `balanceFormatter` function, cleans the asset data and is called by the `checkResults` functions.
const balanceFormatter = (amount, assetId) => {
  const asset_info = algodClient.getAssetByID(assetId);
  const decimals = asset_info["params"]["decimals"];
  const unit = asset_info["params"]["unit-name"];
  const formatted_amount = amount / 10 ** decimals;
  return `${formatted_amount} ${unit}`;
};

const checkResultsOne = async () => {
  const address = "";
  const accountInfo = await algodClient.accountInformation(address).do();
  const assets = await accountInfo["assets"];
  for (const asset in assets) {
    if (asset["asset-id"] === ASSET_ID) {
      const amount = asset["amount"];
      console.log(
        `Account ${address} has ${balanceFormatter(amount, ASSET_ID)}`
      );
      return;
    }
  }
  console.log(`Account ${address} must opt in to Asset ID ${ASSET_ID}`);
};
checkResultsOne();

const checkResultsZero = async () => {
  const address = "";
  const accountInfo = await algodClient.accountInformation(address).do();
  const assets = await accountInfo["assets"];
  for (const asset in assets) {
    if (asset["asset-id"] === ASSET_ID) {
      const amount = asset["amount"];
      console.log(
        `Account ${address} has ${balanceFormatter(amount, ASSET_ID)}`
      );
      return;
    }
  }
  console.log(`Account ${address} must opt in to Asset ID ${ASSET_ID}`);
};
checkResultsZero();

// 6.Build the Best Voting Technology
// The Choice Coin Open Source Software (OSS) Program rewards developers for building Choice Coin software on GitHub.
//  Currently, there are two OSS reward structures, the Gold Badge and the Silver Badge.
//  The Silver Badge rewards substantial contributions to the Voting Repository on the Choice Coin GitHub.
//  The Gold Badge rewards deployment of the Decentralized Decisions software for real world use cases.

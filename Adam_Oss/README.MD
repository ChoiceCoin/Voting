# Atomic Transfer

his simply means that transactions that are part of the transfer either all succeed or all fail. Atomic transfers allow complete strangers to trade assets without the need for a trusted intermediary, all while guaranteeing that each party will receive what they agreed to.

On Algorand, atomic transfers are implemented as irreducible batch operations, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail. This also eliminates the need for more complex solutions like hashed timelock contracts that are implemented on other blockchains. An atomic transfer on Algorand is confirmed in less than 5 seconds, just like any other transaction. Transactions can contain Algos or Algorand Standard Assets and may also be governed by Algorand Smart Contracts.

# Key Benefits of Atomic Transfer

Simple and easy to use

# Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.

## STEPS TO RUN

- clone my repository

- "NODE atomicTransfer"

## Quick Start

```javascript
const token = "Your algod API token";
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const client = new algosdk.Algod(token, server, port);
(async () => {
  console.log(await client.status());
})().catch((e) => {
  console.log(e);
});
```

## Youtube Video

[youtube]()

## Functionalities

- [x] User has to add his/her Api key
- [x] Must have Algosigner wallet

```javascript
//...
onst myAlgoWallet = new MyAlgoConnect();
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "", //Your APi key here
  };
  let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
// From now, every transaction needs to be sign the SK of the following address
//...
```

## Technologies and Platform used

- Js
- Algorand

## Transaction of dispensed algo in Algoexplorer

## TXID

J4E5DUU7S6S3CJV26ROM6TRFWEWTNXE3K7JPOAMC3CFP2ZMAMX7Q

## Reference

[Reference](https://developer.algorand.org/docs/get-details/accounts/rekey/?from_query=rekeying#create-publication-overlay)

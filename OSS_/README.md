# Anime BASH SUBMISSION

A dashboard system that shows all the available wallets on the algorand chain and let you connect to them, also gives you access to your algo balance

# Key Benefits of Dashboard

Simple and easy to use

# Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.

## STEPS TO RUN

- clone my repository

- "npm install" to install dependencies

- 'npm run dev' to run nextJs

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

[youtube](https://youtu.be/IUvy1GNd6yI)

## Functionalities

- [x] User has to add his/her Api key
- [x] Must have Algosigner wallet
- [x] Must have my algo wallet
- [x] Must have Mobile wallet

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
- NEXT JS
- VERCEL
- TAILWIND
- ALGOSIGNER
- MYALGOWALLET
- MOBILE WALLET

## Transaction of dispensed algo in Algoexplorer

## Reference

[Reference](https://developer.algorand.org/docs/get-details/accounts/rekey/?from_query=rekeying#create-publication-overlay)

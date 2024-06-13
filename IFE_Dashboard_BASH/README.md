# ife BASH SUBMISSION

A REWARD system that connects to your algorand wallets

# Key Benefits of Dashboard

Simple, slick and easy to use

# Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.

## STEPS TO RUN

- clone my repository

- "npm install" to install dependencies

- 'npm start' to run nextJs

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

[youtube](https://youtu.be/nPHBi4LDcMo)

## Functionalities

- [x] User has to add his/her Api key
- [x] Must have Algosigner wallet
- [x] Must have my algo wallet
- [x] Must have Mobile wallet

## Technologies and Platform used

- Js
- Algorand
- REACT JS
- VERCEL
- TAILWIND
- ALGOSIGNER
- MYALGOWALLET
- MOBILE WALLET

## Transaction of dispensed algo in Algoexplorer

## Reference

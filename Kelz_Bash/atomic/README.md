# Anime BASH SUBMISSION

This simply means that transactions that are part of the transfer either all succeed or all fail. Atomic transfers allow complete strangers to trade assets without the need for a trusted intermediary, all while guaranteeing that each party will receive what they agreed to.

# Key Benefits of Dashboard

Circular trades - Alice pays Bob if and only if Bob pays Claire if and only if Claire pays Alice.

Group payments - Everyone pays or no one pays.

Decentralized exchanges - Trade one asset for another without going through a centralized exchange.

Distributed payments - Payments to multiple recipients.

Pooled transaction fees - One transaction pays the fees of others.

# Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.

## STEPS TO RUN

- clone my repository

- "npm install" to install dependencies

- 'npm run dev' to run nextJs

## Quick Start

```javascript
const generate = async () => {
  try {
    manA = algosdk.generateAccount();
    manB = algosdk.generateAccount();
    manC = algosdk.generateAccount();
    document.getElementById("first").innerHTML += manA.addr;
    document.getElementById("second").innerHTML += manB.addr;
    document.getElementById("third").innerHTML += manC.addr;
  } catch (error) {
    console.log(error);
  }
};
```

## Youtube Video

[youtube](https://youtu.be/P_0NfIbOaDk)

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
- NEXT JS
- VERCEL
- TAILWIND
- ALGOSIGNER
- MYALGOWALLET
- MOBILE WALLET

## Transaction of dispensed algo in Algoexplorer

## Reference

[Reference](https://developer.algorand.org/docs/get-details/accounts/rekey/?from_query=rekeying#create-publication-overlay)

## tx id JUQEPPJQU75TKI67CZDVGTT3A2NO347QNVCHQXLX2M2DRUQW7VIQ

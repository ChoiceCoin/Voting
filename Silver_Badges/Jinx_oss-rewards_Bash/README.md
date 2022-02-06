## The OSS Developer Reward Bash
  The aim of this bash is to build a platform through which we can reward Active Participants of the Choice-coin Open Source Development Community.

![Header](src\Asset\Register.png)
### Table of Contents
You're sections headers will be used to reference location of destination.

- [Description](#description)
- [Technologies Used](#quick-start)
- [Functionality](#references)
- [License](#license)
- [Author Info](#author-info)

---

## Description
 This application allows multiple transactions to be submitted at one Click. Unlike Atomic Transfer, If any of the transactions fail, not all the transactions will fail But only the onces(account) with the error. That is, this DAPP allows simultaneous execution of multiple transfers of all kinds of assets in one click. 


#### Technologies Used

- React  (Frontend FrameWork)
- Tailwindcss  (for stying and making it reponsive)
- Algosdk  (an Algorand Node that connect to the Algorand BlockChain)
- React-router-dom  (for routing between pages without Refreshing/loading)

[Back To The Top](#the-oSS-developer-reward-bash)

---

## Functionality
- Register Particitating User to the Plateform Database (Full Name, Discord ID, github url, twitter handle, Wallet Address).
- Pasting Users Account Address for Reward/Payments in the Address Field.
-Remove Any extra spaces and verifying account before making any transaction.
- Group Payment (Paying MultipleAccount with just one click with the use of a While Loop).
- Payment FeedBack whether or not the transaction is successful
- Smooth Awesome-UI implementation with React and Tailwindcss


---

## ⭐️ `Rate us`
please don't forget to star this project, every star makes us very happy!

##  Quick Start

📄 fork  `repo`:
```sh
git clone <repo>
#  Install all dependencies:
cd Jinx_oss-rewards_Bash
npm install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from  Purestake ([How to get Purestake Server](https://purestake.io)) 
Example:
```jsx
// API server address, port and API token, which you can get from purestake.io
REACT_APP_SERVER = ''
REACT_APP_PORT = ''
REACT_APP_TOKEN = {
    'X-API-Key': ''
}
// [Optional] Input the wallet address and mnemonic necessary for the
REACT_APP_ACCOUNT =       // paste your prefered account address
REACT_APP_MNEMONIC =      // add your account mnemonic

```
🚴‍♂️ Run your App:
```sh
yarn start
```

---

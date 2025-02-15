# Build a decentralized voting app with choice coin and javascript-algorand-sdk tutorial using NodeJs

## Requirements

* NPM and Node installed, download [HERE](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
* A Purestake API key: [See Tutorial](https://developer.algorand.org/tutorials/getting-started-purestake-api-service/)
* Funded Testnet Accounts: [See Tutorial](https://developer.algorand.org/tutorials/create-account-testnet-javascript/)

## Run Application On Your Local Machine

* git clone the repository

```
  $ git clone https://github.com/Samuellyworld/Choice-Coin-JS-Tutorial.git
```
* go into the application directory

```
 $ cd Choice-Coin-JS-Tutorial
```
* install app dependencies
```
 $ npm install
```
* inside `index.js`, update the following 
```
const token = {
  "X-API-Key": "" //your API key gotten from purestake API, 
}

const mnemonic = ""; //the mmemonic 25 characters seperated by a whitespace should be imported here

const voting_address = '' //input a voting address wallet you can send choice to, make sure choice is opt-in to receive votes

```
* start the application 
```
$ node index.js
```
This can also been done with
```
$ npm start
```

## Live Demo 
![visuals](https://github.com/Samuellyworld/Choice-Coin-JS-Tutorial/blob/main/demo_gif/tutorial.gif)


## Tutorial Links
* [Algorand developer doc](https://developer.algorand.org/tutorials/build-a-decentralized-voting-app-with-choice-coin-and-javascript-sdk/)
* [coins bench](https://coinsbench.com/build-a-decentralized-voting-app-with-choice-coin-and-javascript-algorand-sdk-using-nodejs-1a0101ec0d75)
* [Medium](https://samuel-tosin.medium.com/build-a-decentralized-voting-app-with-choice-coin-and-javascript-algorand-sdk-using-nodejs-1a0101ec0d75)
* [HashNode](https://hashnode.com/post/build-a-decentralized-voting-app-with-choice-coin-and-javascript-algorand-sdk-using-nodejs-ckynmu5n304yhfms11ib9dv7q)
* [Dev](https://dev.to/samuellyworld/build-a-decentralized-voting-app-with-choice-coin-and-javascript-algorand-sdk-using-nodejs-43j3)


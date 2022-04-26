/*
The Bronze Bonus Bash for Choice Coin 
Issue: https://github.com/ChoiceCoin/Voting/issues/933
Run: npm install algo sdk and npm install express
*/
const algosdk = require("algosdk"); //imports algosdk
const express = require('express'); //imports Express

const app=express();


var PORT=process.env.PORT || 8000; //Declares Port



app.use('/', express.static('public'));



app.listen(PORT, ()=>{
  console.log("Server running on port "+PORT+"...")
});




// Get the AlgoSigner sdk from the browser
const { AlgoSigner } = window;


//Define Addresses
const red_address = "";
const blue_address = "";

//Get  DOM Elements
const submitBtn = document.querySelector(".submit")
const connectWallet = document.querySelector(".connect")
const fieldValue = document.querySelector("fieldset")
const radion = [...document.querySelectorAll("input[type='radio']")]


let yesOrNo =""
const setValue = (value)=>{
yesOrNo = value
}
//Function to Connect User Account
const ConnectAccount = (async () => {
    //Check for if AlgoSigner is installed
    if(!AlgoSigner){
        return alert("Please install AlgoSigner")
    }

    //Connect Account if AlgoSigner is Insatalled
  await AlgoSigner.connect()
    .then((d) => {})
    .catch((e) => console.log("errro in conect"));
});


// Sign the Transaction
const signTransaction = (async (receiver = blue_address) => {

  const txn = await AlgoSigner.algod({
    ledger: "TestNet",
    path: "/v2/transactions/params",
  })
    .then((e) => {
      return e;
    })
    .catch((e) => console.log("error in algod"));


    //Get Account Details 
  const account = await AlgoSigner.accounts({
    ledger: "TestNet",
  })
    .then((value) => value[0])
    .then((result) => {
      const { address } = result;

      return address;
    })

    .catch((e) => console.log("error in accounts"));


    //Method used to Sign the transaction
  await AlgoSigner.sign({
    from: account,
    to: receiver,
    amount: document.querySelector("hi"),
    note: "voting",
    fee: txn["min-fee"],
  })
    .then(() => console.log("complete"))
    .catch((e) => console.log("e", e));
});


connectWallet.addEventListener("click",async (e)=>{
    await ConnectAccount()
    connectWallet.value="Connected"
    connectWallet.classList.remove("animate-bounce")
})

radion.forEach((item)=>{
    item.addEventListener("click",(e)=>{
        setValue(e.target.value)
    })
})


submitBtn.addEventListener("click",(e)=>{
    alert("ji")
    //Test if The user didn't Select Anything
    if(!yesOrNo){
    alert("Please Select Either Yes or No")
    }
    if(yesOrNo =="Yes"){
signTransaction(blue_address)
    }
    if(yesOrNo== "No"){
signTransaction(red_address)
    }
console.log(yesOrNo)
})
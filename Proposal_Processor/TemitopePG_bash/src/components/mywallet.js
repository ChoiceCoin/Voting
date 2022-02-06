const Host = "https://testnet-algorand.api.purestake.io/ps2";
const Puretoken = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const Port = "";
const algodClient = new algosdk.Algodv2(Puretoken, Host, Port);

const address_1 = "4PE6M3AC52LVWG237WAFCCEU4HGP2WVDDJ4WX2D3R3LPKOPSQKV2EXO4QY"; 
const address_2 = "FBW2TW34U5IHT2FPSJJLF3NIXO22BW4ZRGKATW7VC3ILX3WWLCOOOZS3QQ";
const redAddress = "AKP5Y6KJB2UKVZRGWZUSR6KFPE4CFYLJ3FMKPGTVG5GILKO5AMXOUXYHSQ"  //Proposal Address

const indexerClient = new algosdk.Indexer(Puretoken,"https://testnet-algorand.api.purestake.io/idx2",Port)

var dropdownModal = document.getElementById('simpleModal'); //wallet dropdown modal

const coin_in_gov_btn = document.getElementById("total_gov_coin");
const wallet_address = document.getElementById("wallet-address");

// err modal
const err = document.getElementById("error");
const errors = document.getElementById("errors")
const er = document.getElementById("err");

// success modal
const success = document.getElementById("success");
const succes = document.getElementById("succes");
const successs =document.getElementById("successs");

// user proposal title
const proposal_title = document.getElementById("proposal-title");

// user choice to start proposal
const proposal_choice = document.getElementById("proposal-choice"); 

// proposal vote page
const proposalVotePage = document.getElementById("proposal-vote");

// proposal header title
const proposalHeader = document.getElementById("proposal-header");
const proposalHead = document.getElementById("header-title");

//proposal button
const proposalButton = document.getElementById("proposal-sign");

// proposal vote button
const proposalvoteButton = document.getElementById("proposal-button");



let red = document.getElementById("red"); // get the red checkbox
let blue = document.getElementById("blue"); //get the blue checkbox
const choiceAmount = document.getElementById("choice-amount")
const successfulVotePage = document.getElementById("successful") //get success page


const ASSET_ID = 21364625;



let respons;
const myAlgoConnect = new MyAlgoConnect(); //myalgowalletconnect




const myAlgoWalletConnect = async () => {

    try {
        let response = await myAlgoConnect.connect(); 
        console.log(response);
        if(response) {
             dropdownModal.style.display = 'none'; //remove modal dropdown
             success.textContent = "Wallet successfully connected";
             success.classList.add("success_show"); //add success modal
             setTimeout(() => {
                 success.classList.remove("success_show");
             }, 1000)


            // let resp = response[0].address.substring(0, 22)
             let res = response[0].address.substring(0, 14)
             respons = response[0].address

            //  wallet_address.textContent = `${res}...`
            //  connectAddress.textContent = `${res}...`
         let rate = 10;
        let history = await indexerClient.searchForTransactions().address(response[0].address).assetID(ASSET_ID).limit(rate).do()
        let totalCoin = 0;
        history["transactions"].forEach(data=>{
            totalCoin += data["asset-transfer-transaction"]["amount"]/100
        });
        // choice_commited.textContent = `${totalCoin}`
        coin_in_gov_btn.textContent += ` ${totalCoin} Choice | ${res}...`;
    coin_in_gov_btn.classList.add("show");
             
         }
        
    } 
    catch (error){
        console.error(error)
    }
}

// sign proposal transactions
const signProposalTransactions = async () => {

    if(!respons) {
     err.textContent= "Make sure your wallet is connected"
     err.classList.add("error_show")
     setTimeout(() => {
         err.classList.remove("error_show")
     }, 1000)
    } else if(!proposal_title.value) {
        err.textContent= "Enter your Proposal"
        err.classList.add("error_show")
        setTimeout(() => {
            err.classList.remove("error_show")
        }, 1000)
    } else if(!proposal_choice.value) {
        err.textContent= "Input Choice Coin to begin Proposal Process"
        err.classList.add("error_show")
        setTimeout(() => {
            err.classList.remove("error_show")
        }, 2000)
    } else {
        let param = await algodClient.getTransactionParams().do(); //get params
        let encode = new TextEncoder();  //encode
                    try {
                        let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                            respons,
                            redAddress,
                            undefined,
                            undefined,
                            Number(proposal_choice.value)*100,
                            encode.encode("Vote with Choice coin"),
                            ASSET_ID,
                            param
                        );
                        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
                        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                        if(response) {
                     
                            proposalCreate.hidden = true;
                            proposalVotePage.hidden = false;
                            footer.hidden = true;
                            Footer.hidden = true;
                            proposalHeader.textContent=` ${proposal_title.value} CONGRATULATIONS, YOUR PROPOSAL WAS ACCEPTED... YOU CAN NOW PROCEED TO VOTE` 
                            proposalHead.textContent=` Your ${proposal_title.value}'s proposal choice ` 
                           
                            success.textContent = `${proposal_title.value}'s WOWZA!!, YOUR PROPOSAL HAS BEEN APPROVED `;
                            success.classList.add("success_show");
                            setTimeout(() => {
                                success.classList.remove("success_show");
                            }, 500)
                        }
                    }catch(error){
                        err.textContent= "There has been an error processing your proposal "
                        err.classList.add("error_show")
                        setTimeout(() => {
                            err.classList.remove("error_show")
                        }, 2000)
                        console.log(error);
                    }
        

    }


}


// sign voting transaction

const myAlgoWalletSign = async () =>{
    
    if(!red.value || !blue.value) {
        errors.textContent= "Choose an Option to continue Voting"
     errors.classList.add("error_show")
     setTimeout(() => {
         errors.classList.remove("error_show")
     }, 2000)
    }
    else if(!choiceAmount.value){
        errors.textContent= "Input Choice Coin to begin Proposal Process"
        errors.classList.add("error_show")
        setTimeout(() => {
            errors.classList.remove("error_show")
        }, 2000)
    }
     // check if redinput is clicked
     else if(red.checked) {
        let value = red.value
        console.log(value)
        let  redChoiceAmount = Number(document.getElementById("choice-amount").value) //get amount
        let response = await algoWalletSend(value, respons, redChoiceAmount);
        if (response){
            console.log(response);
            succes.textContent = `TnxID: ${response}`;
            succes.classList.add("success_show");
            setTimeout(() => {
                succes.classList.remove("success_show");
            }, 500)
        
            proposalVotePage.hidden=true;
            successfulVotePage.hidden = false;

        } 
            
    

        }
      // check if blue input is clicked
    else  if(blue.checked) {
          let value = blue.value
          let blueChoiceAmount = Number(document.getElementById("choice-amount").value) //get amount
          console.log(blueChoiceAmount)
          
        let response = await algoWalletSend(value, respons, blueChoiceAmount);
                if (response){
                    console.log(response);
                    succes.textContent = `TnxID: ${response}`;
                    succes.classList.add("success_show");
                    setTimeout(() => {
                        succes.classList.remove("success_show");
                    }, 500)
                    proposalVotePage.hidden=true;
                    successfulVotePage.hidden = false;
                    // result.textContent= `Your transactionID : ${response}`
                };
        }    
            
    }

    



const algoWalletSend = async (value, wallet_address, amount) => {
    

    let params = await algodClient.getTransactionParams().do(); //get params
    let encoder = new TextEncoder();  //encode
   
 if (value == "one"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_1,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            console.log(error);
            errors.textContent= "There was an error processing your vote! "
            errors.classList.add("error_show")
            setTimeout(() => {
                errors.classList.remove("error_show")
            }, 2000)
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_2,
                undefined,
                undefined,
                amount*100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            console.log(error);
            errors.textContent= "There was an error processing your vote! "
            errors.classList.add("error_show")
            setTimeout(() => {
                errors.classList.remove("error_show")
            }, 2000)
        }

    }

}

const checkWallet = () => {
    if (respons) {
        signProposalTransactions()
    }
    else {
        AlgoSignerProposal()
    }
}

const checkwalletSigned = () => {
    if(respons) {
        myAlgoWalletSign()
    } else {
        algosigner()

    }
}

proposalButton.addEventListener("click", checkWallet);
proposalvoteButton.addEventListener("click", checkwalletSigned);
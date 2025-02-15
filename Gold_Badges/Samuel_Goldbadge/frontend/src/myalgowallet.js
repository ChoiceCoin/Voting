const Host = "https://testnet-algorand.api.purestake.io/ps2";
const Puretoken = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const Port = "";
const algodClient = new algosdk.Algodv2(Puretoken, Host, Port);

const address_1 = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI"; 
const address_2 = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";
const redAddress = "JJT4MJLJPNEWPO3B4DDTXP34B2DOVLIRY5O456M4T2I2RZUVWOC2ZCUSMQ"  //Proposal Address

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

console.log('success', success.className)

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



const red = document.getElementById("red"); // get the red checkbox
const blue = document.getElementById("blue"); //get the blue checkbox
const choiceAmount = document.getElementById("choice-amount")
const successfulVotePage = document.getElementById("successful") //get success page


const ASSET_ID = 21364625; // choicr asset ID



let respons; //respons
const myAlgoConnect = new MyAlgoConnect(); //initialize


/// connection to my algo wallet

const myAlgoWalletConnect = async () => {

    try {
        let response = await myAlgoConnect.connect();
        console.log(response);
        if(response) {
             dropdownModal.style.display = 'none';
             success.textContent = "Wallet successfully connected";
             success.classList.add("success_show");
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
        let totalCoins = totalCoin.toFixed(3);
        // choice_commited.textContent = `${totalCoin}`
        coin_in_gov_btn.textContent += ` ${totalCoins} Choice | ${res}...`;
    coin_in_gov_btn.classList.add("show");
             
         }
        
    } 
    catch (error){
        err.textContent= "Error Connecting to My AlgoWallet 📃 "
        err.classList.add("error_show")
        setTimeout(() => {
            err.classList.remove("error_show")
        }, 2000)
        console.log(error);
    }
}

//sign each  proposal
const signProposalTransactions = async () => {

    if(!respons) {
     err.textContent= "You need to connect your wallet to vote 📵"
     err.classList.add("error_show")
     setTimeout(() => {
         err.classList.remove("error_show")
     }, 1000)
    } else if(!proposal_title.value) {
        err.textContent= "Please enter proposal title ✍️"
        err.classList.add("error_show")
        setTimeout(() => {
            err.classList.remove("error_show")
        }, 1000)
    }  else {
        let param = await algodClient.getTransactionParams().do(); //get params
        let encode = new TextEncoder();  //encode
                    try {
                        let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                            respons,
                            redAddress,
                            undefined,
                            undefined,
                            100*100,
                            encode.encode("Vote with Choice coin"),
                            ASSET_ID,
                            param
                        );
                        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
                        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                        if(response) {
                            fetch('https://choice-proposal-backend.herokuapp.com/data', {
                                method : 'post',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                  title: proposal_title.value,
                                })
                              }).then(response => response.json())

                            proposalCreate.hidden = true;
                            proposalVotePage.hidden = false;
                            footer.hidden = true;
                            Footer.hidden = true;
                            proposalHeader.textContent=` ${proposal_title.value} proposal submitted,you can now vote` 
                            proposalHead.textContent=` Vote on ${proposal_title.value}'s proposal` 
                           
                            success.textContent = `${proposal_title.value}'s Proposal submitted `;
                            success.classList.add("success_show");
                            setTimeout(() => {
                                success.classList.remove("success_show");
                            }, 1000)
                        }
                    }catch(error){
                        err.textContent= "Error Processing Proposal "
                        err.classList.add("error_show")
                        setTimeout(() => {
                            err.classList.remove("error_show")
                        }, 2000)
                        console.log(error);
                    }
        

    }


}



// sign each transaction
const myAlgoWalletSign = async () =>{
    
    if(!red.checked && !blue.checked) {
        errors.textContent= "Please select an Option to vote"
     errors.classList.add("error_show")
     setTimeout(() => {
         errors.classList.remove("error_show")
     }, 2000)
    }
    else if(!choiceAmount.value){
        errors.textContent= "Please enter choice amount"
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
            // result.textContent= `Your transactionID : ${response}` //transaction response
    

        }
      // check if blue input is clicked
    else  if(blue.checked) {
          let value = blue.value
          let blueChoiceAmount = Number(document.getElementById("choice-amount").value) //get amount
          console.log(blueChoiceAmount)
          
        let response = await algoWalletSend(value, respons, blueChoiceAmount);
                if (response){
                    console.log(response);
                    succes.textContent = `TnxID: ${response.txId}`;
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
            errors.textContent= "Error Processing Voting 📃 "
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
            errors.textContent= "Error Processing Voting 📃 "
            errors.classList.add("error_show")
            setTimeout(() => {
                errors.classList.remove("error_show")
            }, 2000)
        }

    }

}

//getting all each proposal ids
const eachError = document.getElementById('each-error');
const eachSuccess = document.getElementById("each-success");
const eachSimpleModal = document.getElementById("eachSimpleModal");
const eachRedOption = document.getElementById("each-red");
const eachBlueOption = document.getElementById("each-blue");
const eachChoiceAmount = document.getElementById("each-choice-amount");
const eachAfterVote = document.getElementById("each-after");
const eachSuccessful = document.getElementById('each-successful');
const eachProposalButton = document.getElementById("each-proposal-button");


//connect each proposal vote
const myAlgoconnectEachProposal = async () => {
    try {
        let eachResponse = await myAlgoConnect.connect();
        eachSimpleModal.style.display = 'none';
        console.log(eachResponse);
        if(eachResponse) {
             eachSimpleModal.style.display = 'none';
             eachSuccess.textContent = "MyAlgoWallet successfully connected";
             eachSuccess.classList.add("success_show");
             setTimeout(() => {
                 eachSuccess.classList.remove("success_show");
             }, 2000)

             respons = eachResponse[0].address
             
         }
        
    } 
    catch (error){
        eachSimpleModal.style.display = 'none';
        eachError.textContent= "Error Connecting to My AlgoWallet 📃 "
        eachError.classList.add("error_show")
        setTimeout(() => {
            eachError.classList.remove("error_show")
        }, 2000)
        console.error(error)
    }

}
//sign each proposal vote
const signEachProposalSubmittedVote = async () => {
    if(!respons) {
        eachError.textContent= "You need to connect your wallet 📵"
        eachError.classList.add("error_show")
        setTimeout(() => {
            eachError.classList.remove("error_show")
        }, 1000)
       } else if(!eachRedOption.checked && !eachBlueOption.checked) {
        eachError.textContent= "Please select an Option to vote"
        eachError.classList.add("error_show")
     setTimeout(() => {
         eachError.classList.remove("error_show")
     }, 2000)
    }
    else if(!eachChoiceAmount.value){
        eachError.textContent= "Please enter choice amount"
        eachError.classList.add("error_show")
        setTimeout(() => {
            eachError.classList.remove("error_show")
        }, 2000)
    }
     // check if redinput is clicked
     else if(eachRedOption.checked) {
        let value = eachRedOption.value
        console.log(value)
        let  redChoiceAmount = Number(document.getElementById("each-choice-amount").value) //get amount
        let response = await algoWalletSend(value, respons, redChoiceAmount);
        if (response){
            console.log(response);
            eachSuccess.textContent = `tnxId: ${response.txId}`;
            eachSuccess.classList.add("success_show");
            setTimeout(() => {
                eachSuccess.classList.remove("success_show");
            }, 500)
            eachSuccessful.hidden = false;
            eachAfterVote.style.display = 'none';
            proposalCreate.hidden = true;
            homePage.hidden = true;
            footer.hidden = true;
            Footer.hidden = true;
            proposals.style.display = 'none'
            
            eachProposalVotePage.hidden = false;
            candidatesPage.style.display = 'none';
            proposalVotePage.hidden=true;
           

        } 
            // result.textContent= `Your transactionID : ${response}` //transaction response
    

        }
      // check if blue input is clicked
    else  if(eachBlueOption.checked) {
          let value = eachBlueOption.value
          let blueChoiceAmount = Number(document.getElementById("each-choice-amount").value) //get amount
          console.log(blueChoiceAmount)
          
        let response = await algoWalletSend(value, respons, blueChoiceAmount);
        if (response){
            console.log(response);
            eachSuccess.textContent = `tnxId: ${response.txId}`;
            eachSuccess.classList.add("success_show");
            setTimeout(() => {
                eachSuccess.classList.remove("success_show");
            }, 1000)
            eachSuccessful.hidden = false;
            eachAfterVote.style.display = 'none';
            proposalCreate.hidden = true;
            homePage.hidden = true;
            footer.hidden = true;
            Footer.hidden = true;
            proposals.style.display = 'none'
            
            eachProposalVotePage.hidden = false;
            candidatesPage.style.display = 'none';
            proposalVotePage.hidden=true;
           

        } 
        }   
}

//getting each candidate ids
const candidateError = document.getElementById('candidate-error');
const candidateSuccess = document.getElementById('candidate-success');

//each candidate id
const jagahVote = document.getElementById('Jagah');
const alphaGlitchVote = document.getElementById('AlphaGlitch');
const princeVote = document.getElementById("Prince");
const oluwatunmiseVote = document.getElementById("Oluwatunmise");
const xekhaiVote = document.getElementById('Xekhai');

// success error and page
const successfulSuccess = document.getElementById('success-succes');


//get candidate to connect wallet

const myAlgoconnectEachCandidate = async () => {
    try {
        let candidateResponse = await myAlgoConnect.connect();
        candidateModal.style.display = 'none';
        console.log(candidateResponse);
        if(candidateResponse) {
             candidateModal.style.display = 'none';
             candidateSuccess.textContent = "MyAlgoWallet successfully connected";
             candidateSuccess.classList.add("success_show");
             setTimeout(() => {
                 candidateSuccess.classList.remove("success_show");
             }, 2000)

             respons = candidateResponse[0].address
             
         }
        
    } 
    catch (error){
        candidateModal.style.display = 'none';
        candidateError.textContent= "Error Connecting to My AlgoWallet 📃 "
        candidateError.classList.add("error_show")
        setTimeout(() => {
            candidateError.classList.remove("error_show")
        }, 2000)
        console.error(error)
    }

}

const signEachCandidateVote = async() => {
    if(!respons) {
        candidateError.textContent= "You need to connect your wallet 📵"
        candidateError.classList.add("error_show")
        setTimeout(() => {
            candidateError.classList.remove("error_show")
        }, 1000)
       } else {
        let param = await algodClient.getTransactionParams().do(); //get params
        let encode = new TextEncoder();  //encode
                    try {
                        let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                            respons,
                            redAddress,
                            undefined,
                            undefined,
                            1*100,
                            encode.encode("Vote with Choice coin"),
                            ASSET_ID,
                            param
                        )
                        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
                        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
                        if(response) {
                            successfulVotePage.hidden = false;
                            homePage.hidden = true;
                            proposals.style.display = 'none'
                            proposalCreate.hidden= true;
                            eachProposalVotePage.hidden = true;
                            footer.hidden = true;
                            proposalVotePage.hidden=true;
                            Footer.hidden = true;
                            candidatesPage.style.display = 'none';
                            console.log(response);
                            successfulSuccess.textContent = `TnxID: ${response.txId}`;
                            successfulSuccess.classList.add("success_show");
                            setTimeout(() => {
                                successfulSuccess.classList.remove("success_show");
                            }, 2000)
                                }
       }
       catch(err) {
        candidateError.textContent= "Error Voting Candidate 🕵🏻‍♂️"
        candidateError.classList.add("error_show")
        setTimeout(() => {
            candidateError.classList.remove("error_show")
        }, 2000)
        console.log(err)
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

const checkEachWallet = () => {
    if (respons) {
        signEachProposalSubmittedVote()
    } else {
        algosignerEachSign()
    }
}
const checkEachCandidateVote = () => {
    if(respons) {
        signEachCandidateVote()
    } else {
        algosignerSignCandidate();
    }
}

proposalButton.addEventListener("click", checkWallet);
proposalvoteButton.addEventListener("click", checkwalletSigned);
eachProposalButton.addEventListener('click', checkEachWallet)
xekhaiVote.addEventListener("click", checkEachCandidateVote );
jagahVote.addEventListener("click", checkEachCandidateVote);
oluwatunmiseVote.addEventListener("click", checkEachCandidateVote);
princeVote.addEventListener("click", checkEachCandidateVote);
alphaGlitchVote.addEventListener("click", checkEachCandidateVote)

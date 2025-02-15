const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "nq1M8RDrIK6CqmXvgdctW1mvuhvgI3nLO2bAk8Aa"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;
const indexerclient = new algosdk.Indexer(token,"https://testnet-algorand.api.purestake.io/idx2",port)

const address_one = "4PE6M3AC52LVWG237WAFCCEU4HGP2WVDDJ4WX2D3R3LPKOPSQKV2EXO4QY"; //option 2 address
const address_two = "FBW2TW34U5IHT2FPSJJLF3NIXO22BW4ZRGKATW7VC3ILX3WWLCOOOZS3QQ"; // option 2 address
const proposalAddress = "AKP5Y6KJB2UKVZRGWZUSR6KFPE4CFYLJ3FMKPGTVG5GILKO5AMXOUXYHSQ" //proposal address


let responses

// algosigner connect

const algoSignerConnect = async () => {
    try {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });
         console.log(accounts);
        if(accounts) {
            dropdownModal.style.display = 'none';
            success.textContent = "Algosigner Wallet successfully connected";
             success.classList.add("success_show");
             setTimeout(() => {
                 success.classList.remove("success_show");
             }, 1200)

             let resp = accounts[0].address.substring(0, 23)
             responses = accounts[0].address

             let rate = 10;
             let history = indexerclient.searchForTransactions().address(responses).assetID(ASSET_ID).limit(rate).do()
             let totalCoin = 0;
             setTimeout(()=> {    
                history["transactions"].forEach(data=>{
                    totalCoin += data["asset-transfer-transaction"]["amount"]/100
                });
             }, 2000)  
             coin_in_gov_btn.textContent += ` ${totalCoin} Choice | ${resp}...`;
             coin_in_gov_btn.classList.add("show");
     
        }

      }
    } catch (error) {
        console.log(error)
        alert("Setup Algosigner")
    }
  };

  //algosigner proposal
  const AlgoSignerProposal = async() => {
    if(!responses) {
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
           }, 1000)
       } else {
        let params = await algodclient.getTransactionParams().do();
        let encoder = new TextEncoder();
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                responses,
                proposalAddress,
                undefined,
                undefined,
                Number(proposal_choice.value)*100,
                encoder.encode("Vote with Choice Coin"),
                ASSET_ID,
                params
             );
            // Use the AlgoSigner encoding library to make the transactions base64
            const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                
            let signedTransaction =  await AlgoSigner.signTxn([{txn: txn_b64}]);
        
            let sendTransaction = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTransaction[0].blob
            });

        if(sendTransaction) {
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

  //voting proposal
  const algosigner = async () => {
    
    if(!red.value || !blue.value) {
        errors.textContent= "Choose an Option to continue Voting"
     errors.classList.add("error_show")
     setTimeout(() => {
         errors.classList.remove("error_show")
     }, 1000)
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
             let  redAmount = Number(document.getElementById("choice-amount").value) //get red choice amount
             let response =  await algoSignerSendTransaction(value, responses, redAmount);
             if (response){
                 // results.textContent= `Your transactionID : ${response}` //transaction response
                 console.log(response)
                 succes.textContent = `TnxID: ${response}`;
                 succes.classList.add("success_show");
                 setTimeout(() => {
                     succes.classList.remove("success_show");
                 }, 500)
             
                 proposalVotePage.hidden=true;
                 successfulVotePage.hidden = false;
     
              };
             console.log(value);
         }
         // check if blue input is clicked
        else if(blue.checked) {
             // const wallet = document.getElementById("wallet").value; //get wallet value
             let value = blue.value
             let  blueAmount = Number(document.getElementById("choice-amount").value) //get blue choice amount
             let response = await algoSignerSendTransaction(value, responses, blueAmount);
                     if (response){
                         // results.textContent= `Your transactionID : ${response}` //transaction response
                         console.log(response)
                         succes.textContent = `TnxID: ${response}`;
                         succes.classList.add("success_show");
                         setTimeout(() => {
                             succes.classList.remove("success_show");
                         }, 500)
                         proposalVotePage.hidden=true;
                         successfulVotePage.hidden = false;
                     };
         }
             
 }
 
 
 const algoSignerSendTransaction = async (value, wallet, amount) => {
     
     let params = await algodclient.getTransactionParams().do();
     let encoder = new TextEncoder();
           
     
     if (value == "one"){
         try {
             let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                 wallet,
                 address_1,
                 undefined,
                 undefined,
                 amount*100,
                 encoder.encode("Vote with Choice Coin"),
                 ASSET_ID,
                 params
              );
             // Use the AlgoSigner encoding library to make the transactions base64
             const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                 
             let signedTransaction =  await AlgoSigner.signedTransaction([{txn: txn_b64}]);
         
             let sendTxn = await AlgoSigner.send({
                 ledger: 'TestNet',
                 tx: signedTransaction[0].blob
             });
         
             return sendTxn;
         }catch(error){
             // results.textContent = error
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
                 wallet,
                 address_2,
                 undefined,
                 undefined,
                 amount*100,
                 encoder.encode("Vote with Choice Coin"),
                 ASSET_ID,
                 params
             );
             const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                 
             let signedTransaction =  await AlgoSigner.signTxn([{txn: txn_b64}]);
         
             let sendTxn = await AlgoSigner.send({
                 ledger: 'TestNet',
                 tx: signedTransaction[0].blob
             });
         
             return sendTxn;
         }catch(error){
             // results.textContent = error
             console.log(error);
             errors.textContent= "There was an error processing your vote "
             errors.classList.add("error_show")
             setTimeout(() => {
                 er.classList.remove("error_show")
             }, 2000)
         }
 
     }
 
 }
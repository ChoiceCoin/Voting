
const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;
const indexerclient = new algosdk.Indexer(token,"https://testnet-algorand.api.purestake.io/idx2",port)

const address_one = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI"; //option 2 address
const address_two = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI"; // option 2 address
const proposalAddress = "RMCX24R2L2LHYNOVYUL3CKNLRA7FOLLMBEINPUK7CFXN3OF3WJNNQTUCP4" //proposal address


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
        alert("Algosigner is not set up yet")
    }
  };

  //algosigner proposal
  const AlgoSignerProposal = async() => {
    if(!responses) {
        err.textContent= "You need to connect your wallet 🥺"
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
       } else if(!proposal_choice.value) {
           err.textContent= "Please enter choice amount to begin proposal ⏳"
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
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
             );
            // Use the AlgoSigner encoding library to make the transactions base64
            const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                
            let signedTxn =  await AlgoSigner.signTxn([{txn: txn_b64}]);
        
            let sendTxn = await AlgoSigner.send({
                ledger: 'TestNet',
                tx: signedTxn[0].blob
            });

        if(sendTxn) {
            proposalCreate.hidden = true;
            proposalVotePage.hidden = false;
            footer.hidden = true;
            Footer.hidden = true;
            proposalHeader.textContent=` ${proposal_title.value} proposal approved,you can now vote` 
            proposalHead.textContent=` Your ${proposal_title.value}'s proposal choice ` 
           
            success.textContent = `${proposal_title.value}'s Proposal approved `;
            success.classList.add("success_show");
            setTimeout(() => {
                success.classList.remove("success_show");
            }, 500)
        
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

  //voting proposal
  const algosigner = async () => {
    
    if(!red.value || !blue.value) {
        errors.textContent= "Please select an Option to vote"
     errors.classList.add("error_show")
     setTimeout(() => {
         errors.classList.remove("error_show")
     }, 1000)
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
                 encoder.encode("Vote with Choice coin"),
                 ASSET_ID,
                 params
              );
             // Use the AlgoSigner encoding library to make the transactions base64
             const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                 
             let signedTxn =  await AlgoSigner.signTxn([{txn: txn_b64}]);
         
             let sendTxn = await AlgoSigner.send({
                 ledger: 'TestNet',
                 tx: signedTxn[0].blob
             });
         
             return sendTxn;
         }catch(error){
             // results.textContent = error
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
                 wallet,
                 address_2,
                 undefined,
                 undefined,
                 amount*100,
                 encoder.encode("Vote with Choice coin"),
                 ASSET_ID,
                 params
             );
             const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                 
             let signedTxn =  await AlgoSigner.signTxn([{txn: txn_b64}]);
         
             let sendTxn = await AlgoSigner.send({
                 ledger: 'TestNet',
                 tx: signedTxn[0].blob
             });
         
             return sendTxn;
         }catch(error){
             // results.textContent = error
             console.log(error);
             errors.textContent= "Error Processing Voting 📃 "
             errors.classList.add("error_show")
             setTimeout(() => {
                 er.classList.remove("error_show")
             }, 2000)
         }
 
     }
 
 }

const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const port = "";
const algodclient = new algosdk.Algodv2(token, server, port);

const CHOICE_ASSET_ID = 21364625;
const indexerclient = new algosdk.Indexer(token,"https://testnet-algorand.api.purestake.io/idx2",port)

const address_one = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI";
const address_two = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";
const proposalAddress = "RMCX24R2L2LHYNOVYUL3CKNLRA7FOLLMBEINPUK7CFXN3OF3WJNNQTUCP4"


let responses

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
             }, 500)  
             coin_in_gov_btn.textContent += ` ${totalCoin} Choice | ${resp}...`;
             coin_in_gov_btn.classList.add("show");
     
        }

      }
    } catch (error) {
        console.log(error)
        alert("Algosigner is not set up yet")
    }
  };

  const AlgoSignerProposal = async() => {
    if(!responses) {
        err.textContent= "You need to connect your wallet 📵"
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
        let params = await algodclient.getTransactionParams().do();
        let encoder = new TextEncoder();
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                responses,
                proposalAddress,
                undefined,
                undefined,
                100*100,
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
            proposalHead.textContent=` ${proposal_title.value}'s proposal` 
           
            success.textContent = `${proposal_title.value}'s Proposal submitted`;
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

  const algosigner = async () => {
    
    if(!red.checked && !blue.checked) {
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
                 succes.textContent = `TnxID: ${response}.txId`;
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
                         succes.textContent = `TnxID: ${response.txId}`;
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

 //each proposal connect
 const algosignerConnectEach = async () => {
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
          const eachAccounts = await window.AlgoSigner.accounts({
            ledger: "TestNet",
          });
          eachSimpleModal.style.display = 'none';
           console.log(eachAccounts);
          if(eachAccounts) {
              eachSimpleModal.style.display = 'none';
              eachSuccess.textContent = "Algosigner Wallet successfully connected";
               eachSuccess.classList.add("success_show");
               setTimeout(() => {
                   eachSuccess.classList.remove("success_show");
               }, 2000)
  
               responses = eachAccounts[0].address

       
          }
  
        }
      } catch (error) {
        eachSimpleModal.style.display = 'none';
          console.log(error)
          eachError.textContent= "Algosigner is not set up yet 📃 "
          eachError.classList.add("error_show")
          setTimeout(() => {
              eachError.classList.remove("error_show")
          }, 2000)
      }
 }

 //each proposal sign
 const algosignerEachSign = async () =>   {
      if(!responses) {
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
         }, 1000)
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
                 let  redAmount = Number(document.getElementById("each-choice-amount").value) //get red choice amount
                 let response =  await algoSignerSendTransaction(value, responses, redAmount);
                 if (response){
                     // results.textContent= `Your transactionID : ${response}` //transaction response
                     console.log(response)
                     eachSuccess.textContent = `TnxID: ${response.txId}`;
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
         
                  };
                 console.log(value);
             }
             // check if blue input is clicked
            else if(eachBlueOption.checked) {
                 // const wallet = document.getElementById("wallet").value; //get wallet value
                 let value = eachBlueOption.value
                 let  blueAmount = Number(document.getElementById("each-choice-amount").value) //get blue choice amount
                 let response = await algoSignerSendTransaction(value, responses, blueAmount);
                         if (response){
                             // results.textContent= `Your transactionID : ${response}` //transaction response
                             console.log(response)
                             eachSuccess.textContent = `TnxID: ${response.txId}`;
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
                         };
             }
                 
     }
 
     //candidate connect
 const algosignerConnectCandidate = async () => {
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
              const candidateAccounts = await window.AlgoSigner.accounts({
                ledger: "TestNet",
              });
              candidateModal.style.display = 'none';
               console.log(candidateAccounts);
              if(candidateAccounts) {
                  candidateModal.style.display = 'none';
                  candidateSuccess.textContent = "Algosigner Wallet connected";
                   candidateSuccess.classList.add("success_show");
                   setTimeout(() => {
                       candidateSuccess.classList.remove("success_show");
                   }, 2000)
      
                   responses = candidateAccounts[0].address
    
           
              }
      
            }
          } catch (error) {
            candidateModal.style.display = 'none';
              console.log(error)
              candidateError.textContent= "Algosigner is not set up yet 📃 "
              candidateError.classList.add("error_show")
              setTimeout(() => {
                  candidateError.classList.remove("error_show")
              }, 2000)
          }
     }

     //candidate sign
const algosignerSignCandidate = async () => {
  
    if(!responses) {
        candidateError.textContent= "You need to connect your wallet 📵"
        candidateError.classList.add("error_show")
        setTimeout(() => {
            candidateError.classList.remove("error_show")
        }, 1000)
       }  else {
        let params = await algodclient.getTransactionParams().do();
        let encoder = new TextEncoder();
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                responses,
                proposalAddress,
                undefined,
                undefined,
                1*100,
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
                successfulVotePage.hidden = false;
                homePage.hidden = true;
                proposals.style.display = 'none'
                proposalCreate.hidden= true;
                eachProposalVotePage.hidden = true;
                footer.hidden = true;
                proposalVotePage.hidden=true;
                Footer.hidden = true;
                candidatesPage.style.display = 'none';
                successfulSuccess.textContent = `TnxID: ${sendTxn.txId}`;
                successfulSuccess.classList.add("success_show");
                setTimeout(() => {
                    successfulSuccess.classList.remove("success_show");
                }, 2000)
            }
       } catch(e) {
        candidateError.textContent= "Error Voting Candidate 🕵🏻‍♂️"
        candidateError.classList.add("error_show")
        setTimeout(() => {
            candidateError.classList.remove("error_show")
        }, 2000)
        console.log(err)
       }
}  
}
function checkForAlgosigner() {
  if (typeof AlgoSigner !== 'undefined') {
    console.log(`AlgoSigner check passed.`);
    document.getElementById('divAlgoSignerCheck').classList.add("is-hidden");
    document.getElementById('divDemoBlock').classList.remove("is-hidden");
    document.getElementById('btnRefreshAccounts').classList.remove("is-hidden");
  } else {
    console.log(`Couldn't find AlgoSigner!`);
    document.getElementById('divAlgoSignerCheck').classList.remove("is-hidden");
    document.getElementById('divDemoBlock').classList.add("is-hidden");
    document.getElementById('btnRefreshAccounts').classList.add("is-hidden");
  };
}

async function waitForAlgosignerConfirmation(tx) {
  console.log(`Transaction ${tx.txId} waiting for confirmation...`);
  let status = await AlgoSigner.algod({
    ledger: 'TestNet',
    path: '/v2/transactions/pending/' + tx.txId
  });

  while(true) {
    if(status['confirmed-round'] !== null && status['confirmed-round'] > 0) {
      //Got the completed Transaction
      console.log(`Transaction confirmed in round ${status['confirmed-round']}.`);
      break;
    }

    status = await AlgoSigner.algod({
      ledger: 'TestNet',
      path: '/v2/transactions/pending/' + tx.txId
    });
  }
  
  return tx;
}
const connectBtn = document.getElementById('connect_btn');
const randomBtn = document.getElementById('random_btn');
let account = undefined;

const baseServer = "https://testnet-algorand.api.purestake.io/ps2"
const token = {
    "X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
};
const algod_port = '';

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port)


function connectWallet() {
    const fetchOptions = {

    }
    AlgoSigner.connect()
    .then(() => AlgoSigner.accounts({
        ledger: 'TestNet'
    }))
    .then((accountData) => {
        accountModal(accountData)
    })
    .catch((error) => {
        createToast(error.message)
        console.error(error)
    })
}


async function TestcreateMulti(addr1, addr2) {
    try {
        let createmultisignature = {
                version: 1,
                threshold: 1,
                addrs: [addr1, addr2],
            };
        let multisignatureaddr = algosdk.multisigAddress(createmultisignature) 
    } catch(error) {
        console.log(error)
    }

}




async function createMulti(addr1, addr2) {
    try {
        let createmultisignature = {
                version: 1,
                threshold: 1,
                addrs: [addr1, addr2],
            };
        let multisignatureaddr = algosdk.multisigAddress(createmultisignature)
        console.log(`Dispense funds to this account ${multisignatureaddr} on Testnet https://bank.testnet.algorand.network`)
        let result = confirm(`Dispense funds to this account ${multisignatureaddr} on Testnet https://bank.testnet.algorand.network. Click okay when done.`)
        if (result  === true){
            const params = await algodClient.getTransactionParams().do();
            const enc = new TextEncoder()
            const note = enc.encode('Choice Multisignature')
            console.log('Creating txn')
            const txn = algosdk.makePaymentTxnWithSuggestedParams(multisignatureaddr, account.addr, 1000000, undefined, note, params)
            console.log('Created')
            if (!account.sk){
                console.log('Signing...')
                const base64Tx = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                const signedTxn = await AlgoSigner.signTxn([{
                    txn: base64Tx,
                    msig: createmultisignature
                }])
                console.log('Signed')
                const binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
                const confirmedTxn = await algodClient.sendRawTransaction(binarySignedTx).do()
                console.log(confirmedTxn)
                alert(`Check Transaction: https://testnet.algoexplorer.io/tx/${confirmedTxn['txId']}`)
                return confirmedTxn
            }
            else {
                const signedTxn = txn.signTxn(account.sk);
                const confirmedTxn = await algodClient.sendRawTransaction(signedTxn).do()
                console.log(confirmedTxn)
                return confirmedTxn
            }
        } else {
            alert(`You did not dispensed funds to addr: ${multisignatureaddr}`)
        }
    } catch(error) {
        console.log(error)
        createToast(error['message'])
    }
}

function accountModal(accountData) {
    console.log(accountData)
    const modalBody = document.querySelector('#connect-wallet .modal-body')
    if (account === undefined){
        accountData.map((account) => {
            const div = document.createElement('div')
            div.classList.add('account')
            div.innerText = account.address
            modalBody.appendChild(div)
        })
    }
    const myModal = new bootstrap.Modal(document.getElementById('connect-wallet'), {
        keyboard: false
      })
    myModal.show()
    const accountWallet = document.querySelectorAll('#connect-wallet .account');
    for (let i=0; i < accountWallet.length; i++){
        accountWallet[i].addEventListener('click', ()=> {
            account = {addr: accountWallet[i].textContent};
            hideModal()
            connectBtn.innerText = "Connected"
            connectBtn.setAttribute('disabled','true')
            randomBtn.style.display = 'none';
        })
    }
}


function hideModal() {
    const myModal = bootstrap.Modal.getInstance(document.getElementById('connect-wallet'))
    myModal.hide()
}



function generateAccount() {
    try{
        account = algosdk.generateAccount()
        console.log(account)
        connectBtn.style.display = 'none';
        randomBtn.innerText = "Account Generated"
        randomBtn.setAttribute('disabled','true')
    }
    catch(error) {
        console.error({'error': `An error occured: ${error}`})
    }
}

const createToast = (message) => {
    const toastContainer = document.getElementById('toast-container')
    const toast = document.createElement('div')
    toast.classList.add('toast','align-items-center')
    toast.setAttribute('aria-live','assertive')
    toast.setAttribute('aria-atomic', 'true')
    toast.setAttribute('id','toastNotice')
    toast.setAttribute('role', 'alert')
    const dFlex = document.createElement('div')
    dFlex.classList.add('d-flex')
    const toastBody = document.createElement('div')
    toastBody.innerText = message
    toastBody.classList.add('toast-body')
    dFlex.appendChild(toastBody)
    const button = document.createElement('button')
    button.classList.add('btn-close','me-2','m-auto')
    button.setAttribute('aria-label','Close')
    button.setAttribute('data-bs-dismiss','toast')
    button.setAttribute('type','button')
    dFlex.appendChild(button)
    toast.appendChild(dFlex);
    toastContainer.appendChild(toast)
    toast.addEventListener('hidden.bs.toast', ()=> {
        toastContainer.removeChild(toast);
    })
    var bsAlert = new bootstrap.Toast(toast)
    bsAlert.show();//show it
}
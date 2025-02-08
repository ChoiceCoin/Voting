let account = undefined;
const connectBtn = document.getElementById('connect_btn');
const blue_address = "EABDJ2MHJOHTHKCLZMRL35UNAPTJALDNPCG2BV2PIHZ3RLQJ6CINGP6YEA"
const red_address = "WCPQRWTRH7BGDMBMU2FFAJLBP34WHNKF23LCWOWKQFIAZN6USVCHUOZYCA";


const baseServer = "https://testnet-algorand.api.purestake.io/ps2"
const token = {
    "X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
};
const algod_port = '';

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port)

const connectWallet = (e)=> {
    AlgoSigner.connect()
    .then(() => AlgoSigner.accounts({
        ledger: 'TestNet'
    }))
    .then((accountData) => {
        account = accountData;
        connectBtn.innerText = "Connected"
        connectBtn.setAttribute('disabled','true')
        connectBtn.style.background = "rgb(168,128,54)";
    })
    .catch((error) => {
        createToast(error.message)
        console.error(error)
    })
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

const signTransaction = async(address_color, amount) => {
    let receiver_address = undefined;
    address_color == "yes" ? receiver_address = blue_address : receiver_address= red_address;
    
    console.log('running sign');
    const params = await algodClient.getTransactionParams().do();
    console.log('params')
    console.log(params)
    const tkn = await new algosdk.Transaction({
        from: account[0].address,
        to: red_address,
        amount: +amount,
        ...params,
    });
    console.log(tkn)
    const binaryTx = tkn.toByte();
    const base64Tx = AlgoSigner.encoding.msgpackToBase64(binaryTx)

    console.log('Signing...')
    const signedTx = await AlgoSigner.signTxn([{
        txn: base64Tx,
    }])

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(signedTx[0].blob);

    // Send the transaction through the SDK client
    await algodClient.sendRawTransaction(binarySignedTx).do().then((data) => {
        createToast('Transaction successful')
    }).catch((error) => {
        if (error.message.indexOf('overspend')) {
            createToast("Your account doesn't have sufficient funds.")
        }
        else {
            createToast("Sorry we were unable to complete the transaction")
        }
    });
    console.log(response)
    createToast('Transferred successfully')
}



const connectBtn = document.getElementById('connect_btn');
const randomBtn = document.getElementById('random_btn');

const baseServer = "https://testnet-algorand.api.purestake.io/ps2"
const token = {
    "X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
};
const algod_port = '';

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port)
const myAlgoConnect = new MyAlgoConnect()


function algosignerConnectWallet() {
    const loading_spinner = document.getElementById('loading_spinner')
    loading_spinner.classList.remove('visually-hidden')
    AlgoSigner.connect()
    .then(() => AlgoSigner.accounts({
        ledger: 'TestNet'
    }))
    .then((accountData) => {
        if (accountData.length){
            const algoAccount = accountData[0]
            const account = {'addr': algoAccount['address']}
            console.log(account)
            sendAccount(account)
        }
    })
    .catch((error) => {
        createToast(error.message)
        console.log(error.message)
        loading_spinner.classList.add('visually-hidden')
    })
}


async function AlgoWalletConnect() {
    try { 
        const loading_spinner = document.getElementById('loading_spinner')
        loading_spinner.classList.remove('visually-hidden')
        const response = await myAlgoConnect.connect();
        console.log(response)
        if (response.length){
            const algoAccount = response[0]
            const account = {'addr': algoAccount['address']}
            console.log(account)
            sendAccount(account)
        }
    } catch (error) {
        console.log(error.message)
        createToast(error.message)
        const loading_spinner = document.getElementById('loading_spinner')
        loading_spinner.classList.add('visually-hidden')
    }
}




function hideModal() {
    const myModal = bootstrap.Modal.getInstance(document.getElementById('connect-wallet'))
    myModal.hide()
}


function accountGenerate() {
    try{
        const loading_spinner = document.getElementById('loading_spinner')
        loading_spinner.classList.remove('visually-hidden')
        const account = algosdk.generateAccount()
        const mnemonic = algosdk.secretKeyToMnemonic(account.sk)
        account['menmonic'] = mnemonic
        sendAccount(account)
    }
    catch(error) {
        console.error('Error occured: ', error.message)
        loading_spinner.classList.add('visually-hidden')
    }
}


function importAccount() {
    try {
        const loading_spinner = document.getElementById('loading_spinner')
        loading_spinner.classList.remove('visually-hidden')
        const modalBody = document.querySelector('#modal-wallet .modal-body')
        modalBody.innerHTML = `
        <div id="main-view" style="flex-direction: column; justify-content: space-between;">
            <div class="px-4 py-2 has-text-weight-bold is-size-5">
                <p style="overflow: hidden; text-overflow: ellipsis;">Import an existing account</p>
            </div>
            <div class="px-3" style="flex: 1 1 0%;">
                <p class="my-3">This will override your current account. Make sure you have backed up your seedphrase</p>
                <textarea id="enterMnemonic" class="form-control" placeholder="Your 25-word passphrase" rows="3"></textarea>
            </div>
            <div style="padding: 1em;">
                <button type="button" class="btn btn-primary is-fullwidth" id="nextStep" disabled="">Import Account</button>
            </div>
        </div>
        `
        const myModal = new bootstrap.Modal(document.getElementById('modal-wallet'), {
            keyboard: false
        })
        myModal.show()
        const mnemonicData = document.getElementById('enterMnemonic');
        const accountContinue = document.querySelector('#main-view button')
        mnemonicData.addEventListener('input', () => {
            if (mnemonicData.value !== '') {
                accountContinue.removeAttribute('disabled');
            } else {
                accountContinue.setAttribute('disabled', 'true');
            }
        })
        accountContinue.addEventListener('click', () => {
            const account = recoverAccount(mnemonicData.value)
            sendAccount(account)
        })
    }
    catch (e) {
        console.error('Error: ', error.message)
        loading_spinner.classList.add('visually-hidden')
    }
}


async function sendAccount(data){
    console.log(data)
    const fetchOptions = {
        method: 'POST',        
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    await fetch('/', fetchOptions)
    .then((response) => {
        console.log(response)
        if (response.redirected){
            window.location.href = response.url;
        }
    })
    .catch((error) => {
        console.log("Error: ", error)
        const loading_spinner = document.getElementById('loading_spinner')
        loading_spinner.classList.add('visually-hidden')
    })
}


function recoverAccount(data) {
    try {
        console.log(data)
        const account = algosdk.mnemonicToSecretKey(data)
        console.log(account)
        account['menmonic'] = data
        return account
    } catch (error) {
        createToast(error.message)
        console.log(error.message)
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
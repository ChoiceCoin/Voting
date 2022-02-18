/* eslint-disable no-undef */

const baseServer = "https://testnet-algorand.api.purestake.io/ps2"
const token = {
    "X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
};

const algod_port = '';

const algodClient = new algosdk.Algodv2(token, baseServer, algod_port);
const myAlgoConnect = new MyAlgoConnect()


export const CheckAlgoSigner = () => {
    if (typeof AlgoSigner !== "undefined"){
        return true
    } else {
        return false
    }
}


export const algoWalletConnect = async  () => {
    try {   
        const response = await myAlgoConnect.connect();
        return response
    } catch (error) {
        console.log(error.message)
        return false
    }
}


export const getInfo =  async(account) => {
    const accountInfo = await algodClient.accountInformation(account.address).do();
    return accountInfo
}

export const accountGenerate = () => {
    try {
        const sdkAccount = algosdk.generateAccount()
        const account = {'address': sdkAccount.addr, 'sk': sdkAccount.sk}
        const mnemonic = algosdk.secretKeyToMnemonic(account.sk)
        account['menmonic'] = mnemonic
        return account
    } catch(error) {
        console.log(error.message)
        return false
    }
}


export const recoverAccount = (data) => {
    try {
        const sdkAccount = algosdk.mnemonicToSecretKey(data)
        const account = {'address': sdkAccount.addr , 'sk': sdkAccount.sk}
        account['menmonic'] = data
        return account
    } catch (error) {
        console.log(error.message)
        return false
    }
}

const Host = "https://testnet-algorand.api.purestake.io/ps2";
const Puretoken = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
}
const Port = "";
const algodClient = new algosdk.Algodv2(Puretoken, Host, Port);

const address_1 = "XQ52337XYJMFNUM73IC5KSLG6UXYKMK3H36LW6RI2DRBSGIJRQBI6X6OYI";
const address_2 = "BSW4FRTCT2SXKVK6P53I57SEAOCCPD6TYAS77YUU725KCY6U7EM2LLJOEI";

// let red = document.getElementById("red"); // get the red checkbox
// let blue = document.getElementById("blue"); //get the blue checkbox

let input = document.getElementsByTagName("input");



const ASSET_ID = 21364625;



const myAlgoConnect = new MyAlgoConnect();

const myAlgoWalletConnect = async () => {

    try {
        let response = await myAlgoConnect.connect();
        console.log(response);
        window.location.href = "/algowallet";
    } catch (error){
        console.error(error)
    }
};

const myAlgoWalletSign = async () =>{

    let wallet_address = document.getElementById("wallet").value;
    for (let i =0; i<input.length; i++){
        if (input[i].checked){
            let value = input[i].value;
            console.log(value)
            try {
                    let response = await algoWalletSend(value, wallet_address);
                    if (response){
                       window.location.href = "/";
                    };
            }

            catch (error) {
                console.error(error);
            }
        }
    }
    
    //  // check if redinput is clicked
    //  if(red.checked) {
    //     let value = red.value
    //     console.log(value)
    //     let wallet_address = document.getElementById("wallet").value; //get wallet address
    //     let response = await algoWalletSend(value, wallet_address);
    //     if (response){
    //         window.location.href = "/";
    //      }

    //     }
    //     else {
    //   // check if blue input is clicked
    //   if(blue.checked) {
    //       let value = blue.value
    //       let wallet_address = document.getElementById("wallet").value; //get wallet address
    //     let response = await algoWalletSend(value, wallet_address);
    //             if (response){
    //                window.location.href = "/";
    //             };
    //     }    
            
    // }
}
    



const algoWalletSend = async (value, wallet_address) => {
    let params = await algodClient.getTransactionParams().do();
    let encoder = new TextEncoder();
    if (value == "red"){
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_1,
                undefined,
                undefined,
                100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            console.log(error);
        }
    }

    else {
        try {
            let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                wallet_address,
                address_2,
                undefined,
                undefined,
                100,
                encoder.encode("Vote with Choice coin"),
                ASSET_ID,
                params
            );
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
            return response;
        }catch(error){
            console.log(error);
        }

    }

}



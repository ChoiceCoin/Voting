const connectWallet = async () => {
    if (typeof AlgoSigner === 'undefined') {
        alert('Please install algosigner extension on your browser');
        window.open("https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
            "_blank"
          );
        return false;
    }

    try {
        await AlgoSigner.connect();

        let address = await AlgoSigner.accounts({
            ledger: 'TestNet'
        });

       if (!address.length) {
           return false;
       }

       return address;
        
    } catch (error) {
        alert("Error ocurred")
        console.error(error);
    }
}
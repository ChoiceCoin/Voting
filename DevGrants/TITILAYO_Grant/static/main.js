/*
This is A Javascipt script that connects wallet and perform manipulation of various
DOM objects after connecting wallet.
Once the wallet has been connected, it saves the connected account in the localstorage.
Once the page is reloaded, it checks if there is a connected account and makes appropriate manipulations of DOM elements.
*/




//This selects the DOM elements that would be manipulated after connecting wallet
const connectButton1 = document.querySelector("#conBtn1");
const connectButtn2 = document.querySelector("#conBtn2");


//This checks the browser's local storage if there is a connectedaccount.
var connectedAccount = JSON.parse(localStorage.getItem("connectedAccount"));

//This creates a new AlgoWallet Connection Instance to be used later in wallet connection.
const connection = new MyAlgoConnect();

//This is a function that runs after connecting wallet. It manipulates neccesary DOM elements.
const afterConnect = (account) => {
    connectButton1.classList.add("connected");
    addr = account[0].address;
    connectButton1.innerHTML = addr.slice(0, 6) + '...' + addr.slice(54, 58);
    connectButtn2.innerHTML = "Submit";
}


//Checks if an account is connected and then run the afterConnectb Function on the connected Account.
if (connectedAccount !== null) {
    afterConnect(connectedAccount);
}



//Function to connected wallet and set the connected account in localstorage. The runs the afterConnect Function
const connectWallet = async () => {
    if (connectedAccount === null){
        result = await connection.connect();
        localStorage.setItem("connectedAccount", JSON.stringify(result));
        afterConnect(result);
        connectedAccount = result;
    }
}

//Onclick event handlers for both connection buttons
connectButton1.onclick = () => {
    connectWallet();
}

connectButtn2.onclick = () => {
    connectWallet()
}
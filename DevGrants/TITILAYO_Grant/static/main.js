
const connectButton1 = document.querySelector("#conBtn1");
const connectButtn2 = document.querySelector("#conBtn2");


var connectedAccount = JSON.parse(localStorage.getItem("connectedAccount"));
console.log(connectedAccount)
const connection = new MyAlgoConnect();

const afterConnect = (account) => {
    connectButton1.classList.add("connected");
    addr = account[0].address;
    connectButton1.innerHTML = addr.slice(0, 6) + '...' + addr.slice(54, 58);
    connectButtn2.innerHTML = "Submit";
}

if (connectedAccount !== null) {
    afterConnect(connectedAccount);
}

const connectWallet = async () => {
    if (connectedAccount === null){
        result = await connection.connect();
        localStorage.setItem("connectedAccount", JSON.stringify(result));
        afterConnect(result);
        connectedAccount = result;
    }
}

connectButton1.onclick = () => {
    connectWallet();
}

connectButtn2.onclick = () => {
    connectWallet()
}

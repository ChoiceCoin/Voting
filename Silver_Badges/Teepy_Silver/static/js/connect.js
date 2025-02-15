
const connectBtn1 = document.querySelector("#connectBtn");
const connectBtn2 = document.querySelector("#connectBtn2");
const voteArea = document.querySelector("#vote")
const heroArea = document.querySelector("#hero")
const loadingArea = document.querySelector("#load")
const loader = document.querySelector("#loader")
const success = document.querySelector("#success")
const connection = new MyAlgoConnect();


var connectState = false
var connectedAccount = null

console.log(connectState, connectedAccount)

const myAlgoConnect = async () => {
    sharedAccount = await connection.connect({shouldSelectOneAccount: false})
    connectBtn.innerHTML = sharedAccount[0].name
    connectBtn2.innerHTML = sharedAccount[0].name
    connectState = true
    connectedAccount = sharedAccount[0]
    heroArea.style.display = "none";
    voteArea.style.display = "block";

    //console.log("Connected");
    //console.log(sharedAccount);
} 

const vote = async (decision) => {
    voteArea.style.display = "none"
    loadingArea.style.display = "flex"
    await sendChoice(connection, connectedAccount.address, decision)
    //console.log(`Yes, I voted this==> ${decision}`)
    loader.style.display = "none"
    success.style.display = "inline-block"
}

connectBtn.onclick = () => {
    if ( connectState ) {
        return false
    } else {
        myAlgoConnect()
    }  
}

connectBtn2.onclick = () => {
    if ( connectState ) {
        return false
    } else {
        myAlgoConnect()
    }  
}
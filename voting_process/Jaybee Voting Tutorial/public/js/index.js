AlgoSigner=window.AlgoSigner//declaring AlgoSIgner extension

//getting neccesary buttons and elements
const connect_button=document.getElementById("connect_algosigner")
const connect_wallet=document.getElementById("connect_algowallet")
const wallet_select=document.getElementById("inputState")
const send_button=document.getElementById("send_choice")
const form=document.getElementById("form")
const home=document.getElementById("home-link")
const wallet=document.getElementById("wallet")
const balance=document.getElementById("balance")
const voting_history_link=document.getElementById("voting_history")
const disconnect_button=document.getElementById("disconnect")

  
  // Get the button that opens the modal

async function connect_algowallet(){
    const myAlgoWallet = new MyAlgoConnect();
    const accounts = await myAlgoWallet.connect();
    //add each account linked to the algoSigner to the select tag for easy use
    accounts.forEach((element)=>{
        var option=document.createElement('option')
        option.value=element.address+"-mywallet"//adding the mode of signing to the wallet to the select value
        option.innerHTML=element.address
        wallet_select.appendChild(option)
    })
    socket.emit("get_balance",wallet_select.value.split("-")[0])/
            socket.emit("get_choice_balance",wallet_select.value.split("-")[0])
            socket.emit("get_transferred_choice",wallet_select.value.split("-")[0])
            connect_button.style.display="none"//removing the connect button 
            connect_wallet.style.display="none"//removing the connect button
            wallet.style.display="block"//making this div object visible 
            balance.style.display="block"
            disconnect_button.style.display="block"
            home.style.marginLeft="10%"
            voting_history_link.style.display="block"
            voting_history_link.href=`/voting_history/${wallet_select.value.split("-")[0]}`
            return accounts
}


//function to connect to algosigner
async function connect_algosigner(){
    try {
        if(typeof AlgoSigner !== 'undefined'){
            let res=await AlgoSigner.connect()
            let accounts=await AlgoSigner.accounts({
                ledger:'TestNet'
            })
            //add each account linked to the algoSigner to the select tag for easy use
            accounts.forEach((element)=>{
                var option=document.createElement('option')
                option.value=element.address+"-signer"//adding the mode of signing to the wallet to the select value
                option.innerHTML=element.address
                wallet_select.appendChild(option)
            })
            //sending the wallet address to the backend to get the algo balance and choice balance
            socket.emit("get_balance",wallet_select.value.split("-")[0])/
            socket.emit("get_choice_balance",wallet_select.value.split("-")[0])
            socket.emit("get_transferred_choice",wallet_select.value.split("-")[0])
            connect_button.style.display="none"//removing the connect button 
            connect_wallet.style.display="none"//removing the connect button
            wallet.style.display="block"//making this div object visible 
            disconnect_button.style.display="block"
            balance.style.display="block"
            home.style.marginLeft="10%"
            voting_history_link.style.display="block"
            voting_history_link.href=`/voting_history/${wallet_select.value.split("-")[0]}`
            return accounts
        }else{
            alert("Install Algosigner")
        }
    } catch (error) {
        console.log(error)
    }
}

//get balance of selected account
async function get_balance(){
    socket.emit("get_balance",wallet_select.value.split("-")[0])
    console.log("reached here")
    socket.emit("get_choice_balance",wallet_select.value.split("-")[0])
    socket.emit("get_transferred_choice",wallet_select.value.split("-")[0])

    voting_history_link.href=`/voting_history/${wallet_select.value.split("-")[0]}`

}


//function to run when the button is clicked
async function do_transaction(event){
    event.preventDefault()
    if(!wallet_select.value.split("-")[0]){
        alert("Connect to your algorand wallert and select a viable wallet")
    }else{
        var data={
            sender:wallet_select.value.split("-")[0],
            "voted_for":document.querySelector('input[name = radioName]:checked').value,
            "choice_for_vote":document.getElementById("choice_per_vote").value//getting the value from the selected radio inputs
            }
        console.log(data)
        socket.emit("vote",data)//sending the data object to the backend to initiate algorand transaction
        

    }
}

function disconnect(){
    document.location.reload(true)//to disconnect from the algosigner reload the page directly from the server(this works in node )
}

//event listeners and there respective functions
connect_button.onclick=connect_algosigner
connect_wallet.onclick=connect_algowallet
wallet_select.onchange=get_balance
disconnect_button.onclick=disconnect
form.addEventListener("submit",do_transaction)
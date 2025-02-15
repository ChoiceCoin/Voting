AlgoSigner=window.AlgoSigner//declaring AlgoSIgner extension

//getting neccesary buttons and elements
const connect_button=document.getElementById("connect_algosigner")
const wallet_select=document.getElementById("inputState")
const send_button=document.getElementById("send_choice")
const form=document.getElementById("form")

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
                option.value=element.address
                option.innerHTML=element.address
                wallet_select.appendChild(option)
            })
            //sending the wallet address to the backend to get the algo balance and choice balance
            socket.emit("get_balance",wallet_select.value)/
            socket.emit("get_choice_balance",wallet_select.value)
            return accounts
        }  
    } catch (error) {
        console.log(error)
    }
}

//get balance of selected account
async function get_balance(){
    socket.emit("get_balance",wallet_select.value)
    console.log("reached here")
    socket.emit("get_choice_balance",wallet_select.value)
}


//function to run when the button is clicked
async function do_transaction(event){
    event.preventDefault()
    if(!wallet_select.value){
        alert("Connect to your algorand wallert and select a viable wallet")
    }else{
        var data={
            sender:wallet_select.value,
            "voted_for":document.querySelector('input[name = radioName]:checked').value,
            "choice_for_vote":document.getElementById("choice_per_vote").value//getting the value from the selected radio inputs
            }
        console.log(data)
        socket.emit("vote",data)//sending the data object to the backend to initiate algorand transaction
        

    }
}

//event listeners and there respective functions
connect_button.onclick=connect_algosigner
wallet_select.onchange=get_balance
form.addEventListener("submit",do_transaction)
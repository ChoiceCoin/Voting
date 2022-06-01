const prompt=require('prompt');
const algosdk=require('algosdk');
const {validate_address,create_candidates_address,vote,calculate_votes,find_winner}=require('./main')

//This helps in connecting the client with the algorand network
const algoServer='https://testnet-algorand.api.purestake.io/ps2'
const algoPort='';
const token = {
    'X-API-Key': 'Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 '
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);



function wrong_input(candidates,voters){
    if(parseInt((candidates)<=1 || parseInt(voters)<=1)){
        return{
            'status':false,
            'message':"Enter a valid value above 1"
        }
    }else if((Boolean(parseInt(candidates) || parseInt(voters))==false)){
        return{
            'status':false,
            'message':"Enter a valid value above 1"
        }
    }else{
        return{
            'status':true,
            'message':"Input values accepted"
        }
    }
}
//receives and validates input values 
const main=async function(){
    try {
        const choice_per_vote=2;//this constant can be changed 
        prompt.start()
        const {candidates,voters} = await prompt.get(['candidates', 'voters'])//These can also be changes to any constant values
        console.log(wrong_input(candidates,voters)["message"])
        let condi=!wrong_input(candidates,voters)['status']
        while (condi) {
            prompt.start()
            console.log("different candidates should be separated by a comma and voters input accepts a number")
            const {candidates,voters} = await prompt.get(['candidates', 'voters'])
            condi=!wrong_input(candidates,voters)['status']
        }
        prompt.start()
        const {escrow_address,escrow_mnemonic}=await prompt.get(['escrow_address','escrow_mnemonic'])
        const is_valid=validate_address(escrow_address,escrow_mnemonic,algoClient,choice_per_vote,voters)
        if(!is_valid['status']){
            console.error(is_valid['message'])
        }else{
            const escrow_key = algosdk.mnemonicToSecretKey(escrow_mnemonic)['sk'];
            let options=await create_candidates_address(escrow_key,escrow_address,algoClient,candidates.split(","))
            console.log("Enter the option you wanna vote for")
            prompt.start()
            const voter_input=await prompt.get('voter_input')
            let voted=await vote(escrow_key,escrow_address,options,Number(voter_input.voter_input),algoClient,choice_per_vote)
            console.log(voted['message'])
            if(!voted['status']){
                return false
            }
            let result=await calculate_votes(options,algoClient)
            let winner=find_winner(result)
            return result,winner
        }
    } catch (error) {
            console.log(error)
    }
}

main()
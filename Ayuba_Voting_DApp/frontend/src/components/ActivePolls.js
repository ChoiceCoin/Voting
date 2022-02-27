import algosdk from 'algosdk';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MyAlgoConnect from "@randlabs/myalgo-connect";


const url = 'http://localhost:8000/api/active_poll/';
const address1 = "H5AS6SDKPVXGFCYJTPPDNEZVBSTXTQOJNYIBPKQOYXJPMABJROWJ5SFVHI"
const address2 = "7NIUXQYVMSJWCIUOZJ53OVPC7PB46PDB7NCPU24WZ7XE4YBT3STAFUL5LM"

const address = window.localStorage.getItem('address')

const ActivePolls = () => {
 
  //data from api
  const [poll,setActivePolls] = useState([]);
  const [amount,setTotalAmount] = useState(0);



  useEffect(() =>{
    axios.get(url).then((res) =>{
      setActivePolls(res.data);
    });
  },[]);


  const handleOnChnge = (event) =>{
    console.log(event.target.value);
  }

  const server = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";
  const token = {
    "X-API-Key": "nH6GvZZLPE2a6yZSLX2BH7Mk5HArCVlF61zv7ps1", 
  };

  const algodClient = new algosdk.Algodv2(token, server, port);
  

  const connectToMyAlgo = async(data) => {

    const myAlgoConnect = new MyAlgoConnect();
    const conn = await myAlgoConnect.connect();
    const my_address = conn[0]['address'];
    const my_name = conn[0]['name'];
    window.localStorage.setItem('address',my_address);
    window.localStorage.setItem('name',my_name);
    const amount_to_send = document.getElementById("amt").value;
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: { ...suggestedParams,},
      from:my_address,
      to: address2,
      amount: Number(amount_to_send), //document.getElementById("amt").value,
    });

    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    await algodClient.sendRawTransaction(signedTxn.blob).do();
}
  

  return (
    <div>
      <div className='container text-light'>
        <div className='row'>
          <div className='col'>
            {poll.map((polls)=>{
              return(
                <div className='card card-body mb-4' key={polls.Active_polls.id} style={{backgroundColor:'#333'}}>
                  <div className='row'>
                    <div className='col-md'>
                      <img src={polls.Active_polls.logo} style={{height:'50px'}}/><br/>
                      {polls.Active_polls.asa_name}
                    <br/>{polls.Active_polls.asa_id}<br/>
                    {polls.Active_polls.start_date}<br/><br/>
                    <ProgressBar className='mb-2' now={100} label={`Reward Pool ${polls.reward_pool/1000}`}/>
                    </div>
                    <div className='col-md-6'>
                      <div className='card card-body text-dark'>{polls.Active_polls.question}</div>
                      </div>
                    <div className='col-md mt-4'>
                    <input className="form-check-input" type="radio" name='vote_option' value={polls.Active_polls.option_one} onChange={handleOnChnge} id="options"/>
                      {polls.Active_polls.option_one}<br/>
                      <ProgressBar now={70} label={polls.Active_polls.option_one_count + '70%'}/>
                      <br/>
                    
                    <div className='col-md mt-2'>
                    <input className="form-check-input" type="radio" name='vote_option' value={polls.Active_polls.option_two} onChange={handleOnChnge} id="options"/>
                      {polls.Active_polls.option_two}<br/>
                      <ProgressBar now={20} label={polls.Active_polls.option_two_count + '20%'}/>
                      <br/>
                      <a className='btn btn-outline-primary'>
                        <input type='number' placeholder='Amount:' id='amt'/>
                        <button className='btn btn-secondary mt-2' onClick={connectToMyAlgo}>Commit Vote</button>
                        </a>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivePolls;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';




const url = 'http://localhost:8000/api/upcoming_poll/';


const UpcommingPolls = () => {

  const [poll,setActivePolls] = useState([]);

  useEffect(() =>{
    axios.get(url).then((res) =>{
      setActivePolls(res.data);
    });
  },[]);

  return (
    <div>
      <div className='container text-light'>
        <div className='row'>
          <div className='col'>
            {poll.map((polls)=>{
              return(
                <div className='card card-body mb-4' key={polls.upcomming_poll.id} style={{backgroundColor:'#333'}}>
                  <div className='row'>
                    <div className='col-md'>
                      <img src={polls.upcomming_poll.logo} style={{height:'50px'}}/><br/>
                      {polls.upcomming_poll.asa_name}
                    <br/>{polls.upcomming_poll.asa_id}<br/>
                    {polls.upcomming_poll.start_date}<br/><br/>
                    <ProgressBar className='mb-2' now={100} label='Reward Pool'/>
                    </div>
                    <div className='col-md-6'><div className='card card-body text-dark'>{polls.upcomming_poll.question}</div></div>
                    <div className='col-md'>
                      {polls.upcomming_poll.option_one}<br/>
                      <ProgressBar className='text-primary' now={100} label={'0 %'}/>
                      <br/>
                    
                    <div className='col-md mt-2'>
                      {polls.upcomming_poll.option_two}<br/>
                      <ProgressBar now={100} label= '0 %'/>
                      <br/>
                    </div>
                    </div>
                    <br/>
                  </div>
                  <br/>
                </div>
              );
            })}
              
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default UpcommingPolls

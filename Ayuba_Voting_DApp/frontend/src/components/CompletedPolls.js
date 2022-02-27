import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';




const url = 'http://localhost:8000/api/completed_poll/';

const CompletedPolls = () => {

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
                <div className='card card-body mb-4' key={polls.Completed_polls.id} style={{backgroundColor:'#333'}}>
                  <div className='row'>
                    <div className='col-md'>
                      <img src={polls.Completed_polls.logo} style={{height:'50px'}}/><br/>
                      {polls.Completed_polls.asa_name}
                    <br/>{polls.Completed_polls.asa_id}<br/>
                    {polls.Completed_polls.start_date}<br/><br/>
                    <ProgressBar className='mb-2' now={45} label='Reward Pool'/>
                    </div>
                    <div className='col-md-6'><div className='card card-body text-dark'>{polls.Completed_polls.question}</div></div>
                    <div className='col-md'>
                      {polls.Completed_polls.option_one}<br/>
                      <ProgressBar now={polls.Completed_polls.option_one_count} label={polls.Completed_polls.option_one_count + '%'}/>
                      <br/>
                    
                    <div className='col-md mt-2'>
                      {polls.Completed_polls.option_two}<br/>
                      <ProgressBar now={polls.Completed_polls.option_two_count} label={polls.Completed_polls.option_two_count + '%'}/>
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

export default CompletedPolls;
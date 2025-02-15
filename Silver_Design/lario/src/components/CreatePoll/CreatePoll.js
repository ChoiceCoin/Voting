import React from 'react'
import Title from '../Title/Title'
import './CreatePoll.css'
import Fade from 'react-reveal/Fade'
import PollForm from '../Form/Form'
import Vote from '../Vote/Vote'
 

const CreatePoll = () => {
    return (
        
        <div className="createpoll">
            <Vote />
            <Title title="Create a Poll" className='poll-child' />
            <Fade left cascade>
                <PollForm />
            </Fade>
        </div>
    )
}

export default CreatePoll

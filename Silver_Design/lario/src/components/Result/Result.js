import React from 'react'
import HomeGraph from '../../assets/images/graph1.png'
import './Result.css'
import Title from '../Title/Title'
import Fade from 'react-reveal/Fade'

const AboutMe = () => {
    return (
        <div className="result">
       
            <Title title="View Result" />        
            <div className="result__container">
            <Fade left cascade >
                <div className="result__image">
                    <img 
                        src={HomeGraph}
                        alt="Graph Result"
                    />
                </div>
            </Fade>
            </div>
        </div>
    )
}

export default AboutMe

import React from 'react'
import {PortfolioData} from '../../data/PortfolioData'
import Title from '../Title/Title'
import './Vote.css'
import {FaThumbsUp} from 'react-icons/fa';
import Fade from 'react-reveal/Fade'
 

const Portfolio = () => {
    return (
        <div className="vote">
            <Title title="Vote" />
            <Fade left cascade>
            <div className="porfolio__projects">
                {
                    PortfolioData.map((data, index) => {
                        return (
                            
                            <div key={index} className="project">
                                <div className="project__title">
                                    <h5>{data.title}</h5>
                                </div>
                                
                                <img 
                                alt={data.alt}
                                src={data.image}
                                />
                                <div className="project__desc">
                                    <p>{data.Desc}</p>
                                </div>
                                <div className="project__links">
                                    <button className="repo" to="/createpoll" target="_blank">
                                       <FaThumbsUp className="icon" /> 
                                       <p>Vote Me</p>
                                    </button>
                                </div>                                 
                            </div>
                        )
                    })
                }
            </div>
            </Fade>
        </div>
    )
}

export default Portfolio

import React from 'react'
import './Docs.css'
import {FaGithub, FaMedium, FaTwitter} from 'react-icons/fa'
import Title from '../Title/Title'
import Fade from 'react-reveal/Fade'
import ChoiceImg from '../../assets/images/choice.jpg'

const Contact = () => {
    return (
            
            <div className="contact">
                <Title title="Contact Us" />
                <div className="contact__container">
                    <Fade left cascade>
                    <div className="contact__map">
                    <img src={ChoiceImg} alt='choicecoin' />
                    </div> 
                    </Fade>
                    <Fade right cascade>
                        <div className="contact__details">
                    <div className="contact__detail">
                        <div className="contact__icon">
                            <FaMedium />
                        </div>
                        <div className="contact__address">
                            <h4>Medium</h4>
                            <p>https://medium.com/@ChoiceCoin</p>
                            
                        </div>
                    </div>
                    <div className="contact__detail">
                        <div className="contact__icon">
                            <FaGithub />
                        </div>
                        <div className="contact__address">
                            <h4>Github</h4>
                            <p>https://github.com/ChoiceCoin</p>
                        </div>
                    </div>
                    <div className="contact__detail">
                        <div className="contact__icon">
                            <FaTwitter />
                        </div>
                        <div className="contact__address">
                            <h4>Twitter</h4>
                            <p>https://www.twitter.com/ChoiceCoinAlgo</p>
                        </div>
                    </div>
                </div>            
                    </Fade>
                </div>
            </div>
    )
}

export default Contact

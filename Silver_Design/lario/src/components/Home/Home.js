import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import HomeGraph from '../../assets/images/graph1.png'
import { Button } from '../Button/Button'
import {
    FaTelegram,
    FaTwitter,
    FaMedium,
    FaGithub,
    FaDiscord
  } from 'react-icons/fa';
import Fade from 'react-reveal/Fade'
import Typical from 'react-typical'


const Home = () => {
    return (
        <div className="home">
            <div className="home__container"> 
                <Fade left cascade>    
                <div className="home__title">
                        <h1>Use Choicecoin</h1>
                        <h1>Decentralized Governance Software</h1>
                        <Typical
                            steps={
                                [
                                    'Eliminate lack of trust', 2100, 
                                    'We make governance decisions open', 1400, 
                                    'We power decentralized decisions', 700
                                ]
                            }
                            loop={Infinity}
                            wrapper="p"
                        />

                        <div className="home__buttons">
                            <Link to='/createpoll' className="to-about">
                                <Button buttonStyle='btn--outline'>
                                    Vote 
                                </Button>
                            </Link>
                            <Link to='/result'>
                                <Button buttonStyle='btn--outline'>
                                    Results 
                                </Button>
                            </Link>
                        </div>

                        <div className='social-icons'>
                            <Link
                                className='social-icon-link fa'
                                to='//www.t.me/choicecoin'
                                target='_blank'
                                aria-label='Telegram'
                            >
                                <FaTelegram />
                            </Link>
                            <Link
                                className='social-icon-link in'
                                to='//www.discord.com/invite/UJY8QXRh'
                                target='_blank'
                                aria-label='Discord'
                                >
                                <FaDiscord/>
                            </Link>
                            <Link
                                className='social-icon-link gt'
                                to={
                                    '//www.github.com/ChoiceCoin'
                                }
                                target='_blank'
                                aria-label='Github'
                                >
                                <FaGithub />
                            </Link>
                            <Link
                                className='social-icon-link tw'
                                to='//www.twitter.com/ChoiceCoinAlgo'
                                target='_blank'
                                aria-label='Twitter'
                                >
                                <FaTwitter />
                            </Link>
                            <Link
                                className='social-icon-link lk'
                                to='//www.medium.com/@ChoiceCoin'
                                target='_blank'
                                aria-label='Medium'
                                >
                                <FaMedium />
                            </Link>
                        </div>
        
                </div>
                </Fade>
                <Fade right cascade>
                <div className="home__image">
                    <img 
                        src={HomeGraph}
                        alt="olanrewaju's, frontend developer"
                    />
                </div>
                </Fade>
            </div>
        </div>
    )
}

export default Home

import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import {FaBars, FaTimes} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import LogoImg from '../../assets/images/logo.png'


function Navbar() {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className='navbar'>
                <div className='navbar-container container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img src={LogoImg} 
                            alt="Choice Coin Logo"
                        className='navbar-icon' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/createpoll' className='nav-links' onClick={closeMobileMenu}>
                                Vote
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/result' className='nav-links' onClick={closeMobileMenu} >
                                View Result
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/docs' className='nav-links' onClick={closeMobileMenu} >
                                Contact us
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/docs' className='nav-links' onClick={closeMobileMenu} >
                                Connect wallet
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Navbar

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import logo from '../static/images/logo.png';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CompletedPolls from './CompletedPolls';
import UpcommingPolls from './UpcommingPolls';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import ActivePolls from './ActivePolls';


function Header() {
    
    const connectToMyAlgo = async() => {
        try {
            const myAlgoConnect = new MyAlgoConnect();
            const accountsSharedByUser = await myAlgoConnect.connect();
            const my_address = accountsSharedByUser[0]['address'];
            const my_name = accountsSharedByUser[0]['name'];
            window.localStorage.setItem('address',my_address);
            window.localStorage.setItem('name',my_name);

        }
        catch (err) {
            console.error(err);
        }
    }

    const isWalletConnected = localStorage.getItem("address") === null ? false : true;
    console.log(isWalletConnected);

    function logout(){
        window.localStorage.removeItem('address');
        window.localStorage.removeItem('name');
    }

        return (
            <div>
                <nav className="py-2 bg-dark border-bottom">
                    <div className="container d-flex flex-wrap">
                        <ul className="nav me-auto">
                            <img src={logo} alt="Logo" style={{height: '50px'}}/>
                        </ul>
                        <div className='dropdown'>
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Sign In/Clear Log
                            </button>
                        
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className='dropdown-item' data-bs-toggle="dropdown" aria-expanded="false" onClick={connectToMyAlgo} >Sign In</button>                       
                                <button className='dropdown-item' data-bs-toggle="dropdown" aria-expanded="false" onClick={logout} >{`Clear Log ${window.localStorage.getItem('name')}`}</button>
                            </ul>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='container'>
                            <ul className="nav me-auto">
                                <li><a className="dropdown-item text-light" href="#">Home</a></li>
                                <li><a className="dropdown-item text-light" href="#">Features</a></li>
                                <li><a className="dropdown-item text-light" href="#">About</a></li>
                                <li><a className="dropdown-item text-light" href="#">Contact</a></li> 
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container mt-2'>
                    <Tabs defaultActiveKey="ActivePolls" id="tab" className="mb-3 border-dark">
                        <Tab eventKey="ActivePolls" title="Active Polls" tabClassName='text-dark'>
                            <ActivePolls />
                        </Tab>
                        <Tab eventKey="Completed" title="Completed Polls" tabClassName='text-dark'>
                            <CompletedPolls />
                        </Tab>
                        <Tab eventKey="UpcommingPolls" title="Upcomming Polls" tabClassName='text-dark'>
                            < UpcommingPolls/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
          )
        }

  

export default Header
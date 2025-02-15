import React, { Component } from 'react';
import { render } from "react-dom";
import Vote from './Vote';


export default class App extends Component {
  render() {
    return (
      <div>
          <nav className='nav navbar-dark bg-success' style={{height:"100px"}}>
            <img src='../../static/images/choice.jpeg' style={{height:"50px",margin:"auto",borderRadius:"30px"}}/>
            <div className='container text-center' style={{margin:"auto"}}>
                <ul>
                    <a href='/logout/' className='nav-link text-white' style={{float:"right"}}>Logout</a>
                    <a href='#' className='nav-link text-white' style={{float:"right"}}></a>
                    <a href='#' className='nav-link text-white' style={{float:"right"}}>About</a>
                    <a href='#' className='nav-link text-white' style={{float:"right"}}>Contact</a>
                    <a href='#' className='nav-link text-white' style={{float:"right"}}>Home</a>
                </ul>
            </div>
          </nav>
          <Vote/>
      </div>
    )
  }
}

const appDiv = document.getElementById("app");
render(<App/>,appDiv);
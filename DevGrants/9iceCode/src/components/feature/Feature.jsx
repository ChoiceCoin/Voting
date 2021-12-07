// import React, { useState } from 'react';
import './feature.css';
import Qrcode from '../../assets/Qrcode.jpg'


const Feature = ({ title, text, textkey }) => {

  return (
    
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="gpt3__features-container_feature-text">
      {title === 'Wallet Address' ? <textarea readOnly spellCheck='false' value={text} ></textarea>: <p>{text}</p>}
      
      {textkey && <textarea readOnly spellCheck='false' value={textkey} ></textarea>}

      {title === 'Qrcode' && <img src={Qrcode} alt='Qrcode' >{text}</img>}
    </div>
  </div>
    )
};

export default Feature;


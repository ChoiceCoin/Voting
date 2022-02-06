import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';


const featuresData = [
  {
    title: 'Decentralized Voting',
    text: 'Choice Coin powers Decentralized Voting Technology that will define governance for the next generation.',
  },
  {
    title: 'Participatory Validation',
    text: 'Holders of Choice Coin can immediately vote on allocations for the network, which will help democratic causes and organizations.',
  },
  {
    title: 'Open Development',
    text: 'The Choice Coin Network is entirely open source, and all participants can develop openly on both Choice Coin and its voting protocol.',
  }
];

const WhatGPT3 = () => (
  <div className='section__margin'>
  <div className="gpt3__blog-heading">
      <h1 className="gradient__text">Why Choice coin </h1>
    </div>
  <div className="gpt3__whatgpt3 ">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="A Democratic Token For a New Age" text="Choice Coin is an Algorand Standard Asset that powers Decentralized Decisions, a voting and governance software built directly on the Algorand Blockchain. Decentralized Decisions enables organizations to make governance decisions in an open and decentralized manner. For the Choice Coin DAO, Decentralized Decisions leverages Proof-of-Participation as a governance mechanism, allowing voters to have a larger say in direct proportion to their contribution to the network." />
    </div>

    <div className="gpt3__whatgpt3-heading">
    <h1 className="gradient__text">Promoting Democracy and Decentralization</h1>
      {/* <p>Choice coin is the community asset with, three core values we are known for.</p> */}
    </div>

    <div className="gpt3__whatgpt3-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
    
  </div>
  </div>
);

export default WhatGPT3;

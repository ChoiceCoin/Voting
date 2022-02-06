import React from 'react';
import Feature from '../../components/feature/Feature';
import Highlight from '../../components/highlight/Highlight';
import './features.css';

const featuresData = [
  {
    title: 'Creator wallet',
    key:'SQX2CZCJJF4UWP7HNY5KQMPOQO35HMVZIPWK4E2XQGCG3HESAKA3XS5MZU'
  },
  {
    title: 'Community Airdrop',
    key: '5GEZB6AJ3Q4EUL23SOOV7RRCCS4TWHZ3ZIDMWT7ZRV2OXITIWKTUVRRCRI',
  },
  {
    title: 'Community Project',
    key: 'A6YR33ODVJWUXILBZCYLCSIZT43VHCSKK5BOUHOE7WVI2H5PFOF3OXR76A',
  },
  {
    title: 'Charity Wallet',
    key: 'ZWSQPM4Y4TNFOAUOQ4LIKX23MGBUBNVWXBXPWNIMIHIRF2BSBTFTZZCDNQ',
  },
];

const Features = () => (
  <>
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">Tokenomics</h1>
      <p>Choice coin is an Algorand Standard Asset built on the Algorand network November 7th,2021. </p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} textkey={item.key} key={item.title + index} />
      ))}
    </div>
  </div>
  <Highlight /> 
  </>
);

export default Features;

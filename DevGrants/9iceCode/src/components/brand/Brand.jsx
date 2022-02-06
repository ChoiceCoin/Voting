import React from 'react';
import { google, slack, atlassian, dropbox, shopify } from './imports';
import './brand.css';

const Brand = () => (
  <div className="gpt3__brand section__padding">
    <div>
      <img src={google} alt="headerImage" />
    </div>
    <div>
      <img src={slack} alt="headerImage" />
    </div>
    <div>
      <img src={atlassian} alt="headerImage" />
    </div>
    <div>
      <img src={dropbox} alt="headerImage" />
    </div>
    <div>
      <img src={shopify} alt="headerImage" />
    </div>
  </div>
);

export default Brand;

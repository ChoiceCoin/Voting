
import { Footer,WhatGPT3, Header } from '../../containers';
import { CTA, Brand, Navbar, Faqs } from '../../components'

import './Home.css';

const Home = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Brand />
    <WhatGPT3 />
    <CTA />
    <Faqs />
    <Footer />
  </div>
);

export default Home;

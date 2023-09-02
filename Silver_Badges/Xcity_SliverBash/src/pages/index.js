import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import {
  homeObjfour,
  homeObjone,
  homeObjthree,
  homeObjtwo,
} from "../components/InfoSection/Data";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjone} />
      <InfoSection {...homeObjtwo} />
      <InfoSection {...homeObjthree} />
      <InfoSection {...homeObjfour} />
      <Footer />
    </>
  );
};

export default Home;

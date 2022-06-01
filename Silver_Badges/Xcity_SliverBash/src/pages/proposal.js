import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Popvotes from "../components/Popvotes";
import Footer from "../components/Footer";
import Middle from "../components/Middle";

const Proposal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Popvotes />
      <Middle />
      <Footer />
    </>
  );
};

export default Proposal;

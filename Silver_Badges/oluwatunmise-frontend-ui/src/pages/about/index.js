import { React, useState, useEffect, useRef } from "react";
import {  } from "react-bootstrap";
// import styled from "styled-components";
import NavBar from "../../components/Navbar";
import AboutHeader from "../../sections/AboutHeader";
import FooterSection from "../../sections/footerSection";
import DOTS from 'vanta/dist/vanta.dots.min';


function About(params) {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(DOTS({
          el: myRef.current,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3EA39E,
          color2: 0x3EA39E,
          backgroundColor: 0x1f2933,
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect]);
    return (
        <div style={{
            // backgroundImage: `url(${background})`,
          }} ref={myRef}>
            <NavBar />
            <AboutHeader />
            <FooterSection />
        </div>
    )
}

export default About
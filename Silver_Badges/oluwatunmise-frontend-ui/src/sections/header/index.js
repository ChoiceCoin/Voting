import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import NavBar from "../../components/Navbar";
import lines from "../../assets/img/lines-bg.svg";
import HeroSection from "../heroSection";
// import BIRDS from 'vanta/dist/vanta.birds.min';
import GLOBE from 'vanta/dist/vanta.globe.min';




const Header = styled.div`
    height: 100vh;
    position: relative;
    overflow: hidden;
    // display: flex;
    align-items: center;
    color: #fff;
    // background: linear-gradient(45deg, #fe802d 8%, #fe0840 50%, #ac0bd9 90%);
    // background: #1F2933;
    // background-image: url(${lines});
    background-size: cover;
`

const Lines = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:1;
    pointer-events: none;
    background-attachment: fixed;
    opacity: 0.4;
    // background-image: url(${lines});
`

function Headers(params) {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(GLOBE({
          el: myRef.current,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3EA39E,
          backgroundColor: 0x1f2933,
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect]);

    return (
        <div ref={myRef}>
            <Header id="Header">
                <Lines></Lines>
                <NavBar style={{backgroundColor:"transparent",
                }}/>
                <HeroSection />
            </Header>
        </div>
    )
}

export default Headers
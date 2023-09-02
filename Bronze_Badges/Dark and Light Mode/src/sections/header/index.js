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
    color: var(--paragraph);
    // background: linear-gradient(45deg, #fe802d 8%, #fe0840 50%, #ac0bd9 90%);
    // background: #1F2933;
    // background-image: url(${lines});
    /* background : var(--background-color); */
    background-size: cover;
    background-color : var(--header-bg);
`

const Lines = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background-attachment: fixed;
    opacity: 0.1;
   /* background-image: url(${lines}); */
`
const ThemeWrapper = styled.div`
    display: flex;
    text-align: center;
    z-index: 3;
    position: absolute;
    right: -1px;
    top: 47px;

    @media screen and (max-width: 1000px) and (min-width: 700px){
      right : -38px;
    }
    @media screen and (max-width: 580px) and (min-width : 500px) {
      right : -53px;
    }
    @media screen and (max-width: 600px) and (min-width : 580px) {
      right : -42px;
    }
    @media screen and (max-width: 700px) and (min-width : 600px) {
      right : -15px;
    }
    @media screen and (max-width: 500px) and (min-width : 300px) {
      right : -56px;
    }

 .theme-switch {
    display: inline-block;
    height: 32px;
    position: relative;
    width: 55px;

    input {
        display: none;
    }
    .slider {
    background: gray;
    bottom: 0;
    cursor: pointer;
    left: -57px;
    position: absolute;
    right: 67px;
    top: -9px;
    bottom: 15px;
    transition: 0.4s; 
    }
    .fa-sun{
    font-size: 19px;
    color: rgb(255, 217, 0);
   }
   .fa-moon {
     font-size: 19px;
     color: rgba(255, 255, 255, 0.836);
   }
   .slider::before {
    bottom: 4px;
    height: 20px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
   }
  input:checked {
    background: grey;
  }
  
  input:checked + .slider::before{
    transform: translateX(18px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round::before {
    border-radius: 50%;
  }

  }
`

const Headers =(params) => {
  const [theme, setTheme] = useState(false);

  const toggleIcon = document.getElementById('toggle-icon');
    
  const switchTheme = (event) => {
     if(event.target.checked) {
        
             document.body.setAttribute('class', 'dark');
             localStorage.setItem('theme', 'dark');
             toggleIcon.classList.remove('fa-sun');
           toggleIcon.classList.add('fa-moon');
             setTheme(!theme)
 
         } else {
             document.body.setAttribute('class', 'light');
             localStorage.setItem('theme', 'light')
             toggleIcon.classList.remove('fa-moon')
           toggleIcon.classList.add('fa-sun');
            setTheme(!theme)
             
         }
     }

     console.log(theme);
     

    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(GLOBE({
          el: myRef.current,
          scale: 1.00,
          scaleMobile: 1.00,
          zIndex: -1,
          // color:  0x3EA39E,
          // backgroundColor:  0x1f2933,

        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect]);

    // console.log(this.props?.currentTheme);

    return (
        <div ref={myRef}>
        <ThemeWrapper>
        <label class="theme-switch">
        <input type="checkbox" onChange={switchTheme}/>
         <i id="toggle-icon" class="fas fa-sun slider round"></i>
      
        </label>
       </ThemeWrapper>
            <Header id="Header">
                <Lines></Lines>
                <NavBar style={{backgroundColor:"transparent",
                }}/>
                <HeroSection />
            </Header>
        </div>
    )
}




export default Headers;
import { React } from "react";
import styled from "styled-components";
// import customButton from "../../components/Button/Button.styles"
import { Container, Row, Col } from "react-bootstrap";
import { SwapRightOutlined,} from "@ant-design/icons";
// import lines from "../../assets/img/lines-bg.svg";
// import mockup2 from "../../assets/img/442-removebg-preview.png";
import CustomButton from "../../components/Button/Button.styles";
// import Particles from "react-tsparticles";
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import { Link } from "react-router-dom";





const Hero = styled.div`
    margin-top: 100px;
`
// const Lines = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100%;
//   z-index: 1;
//   pointer-events: none;
//   background-attachment: fixed;
//   opacity: 0.7;
//   background-image: url(${lines});
// `

const HeaderTitle = styled.div`
 
`

const HeaderText = styled.div`

    
`


function HeroSection(params) {
    // const particlesInit = (main) => {
    //     console.log(main);
    
    //     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    //   };
    
    //   const particlesLoaded = (container) => {
    //     console.log(container);
    //   };

    return (
        <div>
            <Hero>
            {/* <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                background: {
                  color: {
                    value: "transparent",
                  },
                },
                fpsLimit: 60,
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "grab",
                    },
                    resize: true,
                  },
                  modes: {
                    bubble: {
                      distance: 400,
                      duration: 2,
                      opacity: 0.5,
                      size: 40,
                    },
                    push: {
                      quantity: 4,
                    },
                    grab: {
                        distance: 200,
                        duration: 0.4,
                        quantity: 8,
                      },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                  },
                  collisions: {
                    enable: true,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outMode: "out",
                    random: false,
                    speed: 1,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                    value: 50,
                  },
                  opacity: {
                    value: 0.3,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    random: true,
                    value: 5,
                  },
                },
                detectRetina: true,
              }}
            /> */}
                <Container>
                    <div>
                        <Row>
                            <Col md={6} sm={12}>
                                <div className = "header-intro">
                                  <Fade bottom>
                                    <HeaderTitle className="header-title-gradient">
                                        Choice Coin
                                    </HeaderTitle>
                                  </Fade>

                                  <Fade bottom>
                                    <HeaderText className="header-text">
                                    Choice Coin is an Algorand Standard Asset that powers Decentralized Decisions, a voting and governance software built directly on the Algorand Blockchain. Decentralized Decisions enables organizations to make governance decisions in an open and decentralized manner.
                                    </HeaderText>
                                  </Fade>
                                  <Bounce bottom>
                                    <div style={{
                                        margin:"20px 0"
                                    }}>
                                      <Link to="https://fortiorblockchain.com/">
                                        <CustomButton style={{
                                            width:"40%",
                                            height:"100%",
                                            marginRight:"10px",
                                            fontSize:"1em",
                                            backgroundColor:"#01e8f7",
                                            color:"#121212",
                                            border:"1px solid transparent",
                                        }}>

                                            Learn about Fortoir
                                            {/* <QuestionCircleOutlined  style={{
                                                padding:"5px",    
                                            }}    
                                            /> */}
                                        </CustomButton>
                                        </Link>
                                        <CustomButton style={{
                                            width:"40%",
                                            height:"100%",
                                            marginRight:"10px",
                                            fontSize:"1em",
                                            backgroundColor:"transparent",
                                            color:"#276863",
                                            border:"1px solid #276863",
                                        }}>
                                            Vote Now
                                            <SwapRightOutlined style={{
                                                padding:"5px",    
                                            }}    
                                            />
                                        </CustomButton>
                                    </div>
                                  </Bounce>
                                </div>
                            </Col>

                            <Col md={7}>
                                <div className="mockup">

                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Hero>
        </div>
    )    
}

export default HeroSection
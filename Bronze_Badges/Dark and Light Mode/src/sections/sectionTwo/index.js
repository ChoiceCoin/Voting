import { React, } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
// import team from "../../assets/gifs/84565-about-us.gif";
import team2 from "../../assets/gifs/animation_500_kwdib4d4.gif"
import Fade from 'react-reveal/Fade';


const HeaderText = styled.div`
    color: var(--nav-color);
    padding: 20px 0px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    font-size: 1.5em;
    text-decoration: overline;
`

function SectionTwo(params) {
    return (
        <div id="section-two">
            <Container>
                <Row>
                    <Col md={5}>
                        <Fade bottom>
                            <img src={team2} alt="About us" width="80%" />
                        </Fade>
                    </Col>
                    <Col md={1}></Col>
                    
                    <Col md={6} style={{
                        padding:"20px",
                        margin:"40px 0",
                    }}>
                        <Fade bottom>
                            <p style={{
                                color:"var(--paragraph)",
                                fontSize:".95em",
                                fontFamily:"'Rubik', sans-serif",
                            }}>
                            Choice Coin is a governance token and open source software for decentralized voting. The Choice Coin Network is prioritizing democracy, and will incentivize its participants to help it fundamentally change how decisions are made on a large scale. Choice Coin solves the decentralized voting problem by introducing a digital asset for voting on a distributed ledger.


                            <p>Choice Coin is also entirely open source, with no formal strucutre or entity attached to it. Since its inception, Choice Coin has attracted a plethora of contributors from all over the world.</p>
                            </p>
                            <div>
                                <HeaderText>About Choice Coin</HeaderText>
                            </div>
                        </Fade>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SectionTwo

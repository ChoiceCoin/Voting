import { React, } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
// import vote from "../../assets/img/vote.png";
// import validate from "../../assets/img/validate.png";
// import develop from "../../assets/img/develop.png";
import vote from "../../assets/gifs/5717-decentralized.gif";
import validate from "../../assets/gifs/24847-confirmation.gif";
import develop from "../../assets/gifs/20211-open-source-software.gif";
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';



const CustomCard = styled(Card)`
    background: var(--background-color);
    border: 1px solid transparent;
    height:55vh;
    border-radius: 12px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    // background-color: #3EA39E;
    // background-color: #00b7ed;
    // background-image: linear-gradient(133deg, #01e8f7, #00b3ec 40%);
    padding: 30px;
    margin: 35px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: var(--section-color);
`
const ImageWrapper = styled.div`
    border-radius: 200px;
    width: 100%;
    height: 100%;
    margin: 20px 0;
    padding: 20px;
`
const HeaderText = styled.div`
    color: var(--section-color);
    padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    font-size: 1.5em;
    text-decoration: overline;
`
function SectionThree(params) {

    return(
        <div id="section-three">
            <Container>
                    <Slide bottom>
                        <HeaderText>Promoting Democracy and Decentralization</HeaderText>
                    </Slide>
                    <Row>
                        <Col md={4}>
                            <Fade bottom>
                                <CustomCard>
                                    <Fade top>
                                        <ImageWrapper>
                                            <img src={vote} alt="Vote" width="120px" />   
                                        </ImageWrapper>
                                        <h5 style={{marginBottom:"20px"}}>Decentralized Voting</h5>
                                        <p>Choice Coin powers Decentralized Voting Technology that will define governance for the next generation.</p>
                                    </Fade>
                                </CustomCard>
                            </Fade>
                        </Col>
                        <Col md={4}>
                            <Fade bottom>
                                <CustomCard>
                                    <Fade top>
                                        <ImageWrapper>
                                            <img src={validate} alt="Vote" width="120px" />   
                                        </ImageWrapper>  
                                        <h5 style={{marginBottom:"20px"}}>Participatory Validation</h5>
                                        <p>Holders of Choice Coin can immediately vote on allocations for the network, which will help democratic causes and organizations.</p>
                                    </Fade>
                                </CustomCard>
                            </Fade>
                        </Col>
                        <Col md={4}>
                            <Fade bottom>
                                <CustomCard>
                                    <Fade top>
                                        <ImageWrapper>
                                            <img src={develop} alt="Vote" width="120px" />   
                                        </ImageWrapper>
                                        <h5 style={{marginBottom:"20px"}}>Open Development</h5>
                                        <p>The Choice Coin Network is entirely open source, and all participants can develop openly on both Choice Coin and its voting protocol.</p>
                                    </Fade>
                                </CustomCard>
                            </Fade>
                        </Col>
                    </Row>
           </Container>
        </div>
    )
}

export default SectionThree
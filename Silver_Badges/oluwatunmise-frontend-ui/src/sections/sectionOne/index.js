import { React, } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components"
import CardOneImage from "../../assets/img/603ff2c336038a3563dde353_image-3-teams-technology-template.svg";
import CardTwoImage from "../../assets/img/603ff2c3d11f076b92242695_image-2-teams-technology-template.svg";
// import CustomButton from "../../components/Button/Button.styles";
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';


const CustomCard = styled(Card)`
    background: transparent;
    border: 1px solid transparent;
    height:55vh;
    border-radius: 12px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 85%;
    background-color: #3EA39E;
    background-color: #00b7ed;
    background-image: linear-gradient(133deg, #01e8f7, #00b3ec 40%);
    padding: 60px;
    margin: 35px;
    `
    const HeaderText = styled.div`
    color: #3EA39E;
    padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    margin: 30px 0;
    font-size: 1.8em;
    text-decoration: overline;
`

function SectionOne(params) {
    return(
        <div id="section-one">
            <Container>
                <Slide bottom>
                    <div>
                        <HeaderText>The next big thing?</HeaderText>
                    </div>
                </Slide>
                <div>
                    <Row>
                        <Fade left>
                            <CustomCard>
                                <Fade bottom>
                                    <Row>
                                        <Col md={5}>
                                            <img src={CardOneImage} alt="card" style={{
                                                width:"90%"
                                            }} />
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={6}>
                                            <h4>Decentralized Governance</h4>
                                            <p style={{opacity:"0.75", fontSize:".9em", margin:"10px 0",}}>
                                                The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. As the decentralized Intranet evolves, more and more organizations operating in and working on projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. Contrary to centralized systems, which are inherently hierarchical and pyramid like in nature, decentralized systems distribute power and decision making across global networks in a fair fashion. 
                                            </p>
                                        </Col>
                                    </Row>
                                </Fade>
                            </CustomCard>
                        </Fade>
                        <Fade right>
                            <CustomCard>
                                <Fade bottom>
                                    <Row>
                                        <Col md={5}>
                                            <img src={CardTwoImage} alt="card" style={{
                                                width:"90%"
                                            }} />
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={6}>
                                            <h4>Redefining Voting</h4>
                                            <p style={{opacity:"0.75", fontSize:".9em", margin:"10px 0", }}>
                                                All entities, from small businesses to first-world nations, suffer from outdated voting mechanisms that contribute to a culture of non-participation and voter supression. This leads to decisions that do not take fairly take into account what constituients and voters may want. To learn more about Choice Coin, please visit the official community website.
                                            </p>
                                        </Col>                                        
                                    </Row>
                                </Fade>
                            </CustomCard>
                        </Fade>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default SectionOne
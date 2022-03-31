import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import styled from "styled-components";
import aboutUs from "../../assets/img/3026238-removebg-preview.png"


function AboutHeader(params) {
    return (
        <div>
            <div style={{marginTop:"20vh"}}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className="about">
                                <h5 style={{
                                    fontFamily:" 'Open Sans', sans-serif",
                                    fontWeight:"bold",
                                    // color:"#434343",
                                    color:"#fafafa",
                                    fontSize:"1.6em",
                                }}>
                                    ABOUT Choice Coin
                                </h5>
                                <p>
                                    Choice Coin is a governance token and open source software for decentralized voting. The Choice Coin Network is prioritizing democracy, and will incentivize its participants to help it fundamentally change how decisions are made on a large scale. Choice Coin solves the decentralized voting problem by introducing a digital asset for voting on a distributed ledger. 
                                </p><p>
                                Choice Coin is also entirely open source, with no formal strucutre or entity attached to it. Since its inception, Choice Coin has attracted a plethora of contributors from all over the world.
                                </p>
                                <p>
                                The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. As the decentralized Intranet evolves, more and more organizations operating in and working on projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. Contrary to centralized systems, which are inherently hierarchical and pyramid like in nature, decentralized systems distribute power and decision making across global networks in a fair fashion. But, building decentralized systems is difficult, complex, and time consuming. The Decentralized Decisions software solves this problem with a secure, easy to use, and flexible governance software.
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                <img src={aboutUs} alt="About Us"
                                    style = {{
                                        width:"80%",

                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default AboutHeader
import React from "react";
import { Container,  Row, Col, Accordion, Card, } from "react-bootstrap";
import faq2 from "../../assets/gifs/25046-faq-ask-and-you-get-an-answer.gif";
import connection from "../../assets/img/5394665-removebg-preview.png"
// import vote from "../../assets/img/4116831-removebg-preview.png"
import styled from "styled-components"
import { UsergroupAddOutlined, StopOutlined,} from "@ant-design/icons"
import Countdown from "react-countdown";
import votegif from "../../assets/gifs/8174-vote.gif";
import { Link } from "react-router-dom"

const CustomCard = styled(Card)`
    width: 95%;
    height: 100px;
    margin: 40px 0;
    padding: 30px;
    border: 1px solid transparent;
    background-color: rgba(2, 1, 1, 0.03);
    color: #1F2933;
    border-radius: 5px;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
    
`
const HeaderText = styled.div`
    color: #1c242e;
    padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    margin: 30px 0;
    font-size: 1.5em;
    text-decoration: overline;
`

const VoteTitle = styled.div`
    color: #1c242e;
    // padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    // font-family: 'Roboto', sans-serif; 
    font-size: 1.2em;
    font-weight: bold;
  `

function VoteDashboard() {

  const Completionist = () => <div style={{color:"red"}}>
      <StopOutlined />
      <span>Vote Closed</span>
    </div>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

    return (
      <div style={{
      }}>
        <Container>
          <Row className="vote-panel" style={{height:"100vh",}}>
            <Col md={6} className="gif-div" style={{padding:"20px", margin:"30px 0"}}>
              <div class="image-wrapper">
                <img src={votegif} alt="vote" width="70%" />
              </div>
            </Col>
            <Col md={6}>
              <div>
                  <HeaderText style={{marginLeft:"0px", paddingLeft:"0px",}}>Open Votes</HeaderText>
                  <p style={{color:"#666666",}}>Here are some open votes you can participate in</p>
                  <p style={{color:"red", fontWeight:"bold", fontSize:".9em"}}>Connect your wallet to vote</p>
                  <Link to="/submit-vote" style={{textDecoration:"none"}}>
                    <CustomCard className="vote-card" style={{
                      height:"18vh",
                    }}>
                        <div className="vote-title">
                          <VoteTitle>Decentralized voting should be adopted worldwide</VoteTitle>
                        </div>
                        <div className="sub-text" style={{
                          display:"flex",
                          position: "relative",
                          // marginTop:"25px",
                        }}>
                          <div className="countdown" style={{display:"flex", float:"right", color:"#3EA39E", }}>
                              {/* <ClockCircleOutlined style={{margin:"-10px 4px 10px 0px"}}/> */}
                              <Countdown date={Date.now() + 50000000} renderer={renderer} />
                          </div>
                          <div className="already-voted">
                            <span style={{
                              color:"#666666",
                              // marginLeft:"250px",
                            }}>
                              <UsergroupAddOutlined style={{margin:"-10px 4px 10px 0px"}}/>
                              96 voted</span>
                          </div>
                        </div>
                    </CustomCard>
                  </Link>
                  <Link to="/submit-vote" style={{textDecoration:"none"}}>                
                  <CustomCard className="vote-card" style={{
                    height:"18vh",
                  }}>
                      <div className="vote-title">
                        <VoteTitle>Decentralized voting should be adopted worldwide</VoteTitle>
                      </div>
                      <div style={{
                        display:"flex",
                        position: "relative",
                        marginTop:"25px",
                      }}>
                        <div className="countdown" style={{float:"right", color:"#3EA39E",}}>
                            {/* <ClockCircleOutlined style={{margin:"-10px 4px 10px 0px"}}/> */}
                            <Countdown date={Date.now() + 50000000} renderer={renderer} />
                        </div>
                        <div className="already-voted">
                          <span style={{
                            color:"#666666",
                            // marginLeft:"250px",
                          }}>
                            <UsergroupAddOutlined style={{margin:"-10px 4px 10px 0px"}}/>
                            44 voted</span>
                        </div>
                      </div>
                  </CustomCard>
                  </Link>
              </div>
            </Col>
          </Row>

          <Row className="faq" style={{
            height:"75vh",
            backgroundColor:"#1F2933",
            borderRadius:"8px",
            margin:"30px 0",  
            boxShadow:"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
            // boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}>
            <Col md={7}>
              <div className="FAQ">
                <HeaderText style={{color:"#fff"}}>FAQs</HeaderText>
              </div>
              <div>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How can I participate</Accordion.Header>
                  <Accordion.Body>
                   You can participate by contributing to our open source software.The Open Source Software (OSS) Program rewards developers for building Choice Coin software on GitHub. Currently, there are two OSS reward structures, the Gold Badge and the Silver Badge. The Silver Badge rewards substantial contributions to the Voting Repository on the Choice Coin GitHub. The Gold Badge rewards deployment of the Decentralized Decisions software for real world use cases.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>What is Choice coin used for?</Accordion.Header>
                  <Accordion.Body>
                  The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. As the decentralized Intranet evolves, more and more organizations operating in and working on projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. 
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Where can I get Choice coin?</Accordion.Header>
                  <Accordion.Body>
                  Choice Coin is now available on TinyMan! TinyMan is a Decentralized Exchange and Automated Market Maker operating on the Algorand Blockchain. It allows individuals to swap various ASAs for one another. Get Choice Coin on TinyMan today! Also, view current market information on AlgoCharts, an open source software created to track ASAs on TinyMan, here.


                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>What is Choice Coin</Accordion.Header>
                  <Accordion.Body>
                  Choice Coin is an Algorand Standard Asset (ASA) for solving the Decentralized Governance Problem, which refers to the lack of a secure and autonomous process for decentralized organizations to reach consensus during governance. Choice Coin also operates as a Decentralized Autonomous Organization (DAO), and has an extensive network that works on open source software development, community engagement, and more. Choice Coin is currently the largest open source project on the Algorand Network.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              </div>
              </Col>
              <Col md={5}>
                <div>
                  <img src={faq2} alt="FAQ"  width="75%"/>
                </div>
              </Col>
          </Row>
        </Container>
        <div>
           <img src={connection} alt="Header Blob"
              style={{
                width:"25%",
                transform: "rotate(60deg)",
                position:"absolute",
                bottom:"-45vw",
                left:"-10vw",
                opacity:"0.25"
              }}
            />
            <img src={connection} alt="Header Blob"
              style={{
                width:"25%",
                transform: "rotate(60deg)",
                position:"absolute",
                top:" -10vw",
                left:"-10vw",
                opacity:"0.25"
              }}
            />
            <img src={connection} alt="Header Blob"
              style={{
                width:"25%",
                transform: "rotate(60deg)",
                position:"absolute",
                top:" 30vw",
                right:"-10vw",
                opacity:"0.25"
              }}
            />
            <img src={connection} alt="Header Blob"
              style={{
                width:"25%",
                transform: "rotate(60deg)",
                position:"absolute",
                bottom:"-45vw",
                left:"-10vw",
                opacity:"0.25"
              }}
            />
        </div>
      </div>
    );
  }

export default VoteDashboard
  
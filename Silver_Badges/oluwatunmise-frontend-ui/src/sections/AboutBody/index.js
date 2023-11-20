// D2EEEC
import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import styled from "styled-components";


function AboutBody(params) {
    return (
        <div>
            <div style={{
                backgroundColor:"#D2EEEC",
                paddingTop:"50px",

            }}>
                <Container>
                    <Row>
                        <Col md={4}>
                            <Card style={{
                                padding:"20px",
                                height:"250px",
                                backgroundColor:"transparent",
                                border: "1px solid #48BBAF",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
                            }}>
                                <div className="card-title">
                                    <h4>Audits</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                    Yieldly’s smart contracts have undergone rigorous auditing by the award-winning cybersecurity firm Halborn, who have audited Coinbase, SushiSwap, Polygon and other top projects.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={{
                                padding:"20px",
                                height:"250px",
                            }}>
                                <div className="card-title">
                                    <h4>Support</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Yieldly will never directly message you first on any platform. Please be aware of scammers.
                                        If you have any issues please contact Yieldly support
                                        • support@yieldly.finance
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={{
                                padding:"20px",
                                height:"250px",
                            }}>
                                <div className="card-title">
                                    <h4>Support</h4>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Yieldly will never directly message you first on any platform. Please be aware of scammers.
                                        If you have any issues please contact Yieldly support
                                        • support@yieldly.finance
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={6}>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default AboutBody
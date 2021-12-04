    import { React, } from "react";
    // import { Container, Row, Col } from "react-bootstrap";
    // import styled from "styled-components"
    import Footer from '../../components/footer';
    import Icon from '../../components/icons';


    function FooterSection(params) {
        return (
            <div>
                 <Footer>
                    <Footer.Wrapper>
                    <Footer.Row>
                        <Footer.Column className="no-mobile">
                        <Footer.Title>About Us</Footer.Title>
                            <Footer.Link href="/about">About </Footer.Link>
                            <Footer.Link href="https://fortiorblockchain.com/">About Fortoir</Footer.Link>
                            <Footer.Link href="https://choice-coin.com/About.html">Choice Coin</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="mobile">
                        <Footer.Title>Development</Footer.Title>
                            {/* <Footer.Link href="https://choice-coin.com/participation.html">Participate</Footer.Link> */}
                            <Footer.Link href="https://choice-coin.com/documentation.html">Research</Footer.Link>
                            <Footer.Link href="https://choice-coin.gitbook.io/choice-coin-docs/">Docs</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="no-mobile">
                        <Footer.Title>See us at:</Footer.Title>
                            <Footer.Link href="https://medium.com/@ChoiceCoin">Blog</Footer.Link>
                            <Footer.Link href="https://choice-coin.com/">Website</Footer.Link>
                            <Footer.Link href="https://choice-coin.gitbook.io/choice-coin-docs/get-choice/tinyman">TinyMan</Footer.Link>
                        </Footer.Column>
                        <Footer.Column className="mobile">
                        <Footer.Title>Community</Footer.Title>
                            <Footer.Link href="https://discord.gg/7aenzkKzVt"><Icon className="fab fa-facebook-f" />Discord</Footer.Link>
                            {/* <Footer.Link href="https://github.com/ChoiceCoin/Choice-V1"><Icon className="fab fa-instagram" />Github</Footer.Link> */}
                            <Footer.Link href="https://medium.com/@ChoiceCoin"><Icon className="fab fa-youtube" />Medium</Footer.Link>
                            {/* <Footer.Link href="#"><Icon className="fab fa-twitter" />Reddit</Footer.Link> */}
                        </Footer.Column>
                    </Footer.Row>
                        <div style={{
                                color: "var(--paragraph)",
                                textAlign:"center",
                                width:"100%",
                                margin:"20px 0"
                            }}>
                                <h6>&copy; 2021 Choice Coin</h6><span style={{opacity:"0.75", fontSize:".9em"}}>All rights reserved.</span>
                            </div>
                    </Footer.Wrapper>
                </Footer>
            </div>
        )
    }

    export default FooterSection
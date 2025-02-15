import { React } from "react";
import { Navbar, Nav, NavDropdown, Container, } from 'react-bootstrap';
import brandlogo from "../../assets/img/logo-raw-removebg-preview.png";

function NavBar(params) {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg=""
                style={{
                    zIndex:"1000",
                    // backgroundColor:"#1F2933",
                    fontSize:"1em",
                    fontFamily:"'Montserrat', sans-serif",
                    fontWeight:"bold",
                }}
                className="shift"
            >
                <Container>
                <Navbar.Brand href="/">
                    <img src={brandlogo} alt="Choice Coin" width="5%"/>
                    <p>Choice Coin</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto justify-content-end">
                        
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/vote">Vote</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <NavDropdown title="Connect Wallet" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">MetaMask</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">CoinBase</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">WalletConnect</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Algorand Wallet</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )    
}

export default NavBar
import { React, useState, useEffect, useRef } from "react";
import { Container, Row, Col, ButtonGroup, ToggleButton,} from "react-bootstrap";
import CustomButton from "../../components/Button/Button.styles";
import NavBar from "../../components/Navbar";
import FooterSection from "../../sections/footerSection";
import styled from "styled-components";
import DOTS from 'vanta/dist/vanta.dots.min';
import { message, } from 'antd';





const HeaderText = styled.div`
    color: #1c242e;
    padding: 0 50px;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif; 
    font-family: 'Pacifico', cursive;
    // font-family: 'Rubik', sans-serif;
    font-size: 1.5em;
    text-decoration: overline;
`

const CustomToggleButton = styled(ToggleButton)`
    width: 130px;
    height: 50px;
    margin: 10px 20px;
    padding: 15px;
`

function VoteDetailsDashboard() {
  
  const success = () => {
    message.success('This is a success message');
    console.log("hey")
  };

  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Yes', value: '1' },
    { name: 'No', value: '2' },
  ];
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(DOTS({
        el: myRef.current,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3EA39E,
        color2: 0x3EA39E,
        backgroundColor: 0x1f2933,
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect]);

    return (
      <div style={{
        // backgroundImage: `url(${background})`,
      }} ref={myRef}>
            <NavBar style={{backgroundColor:"#1F2933",}}/>
            <div style={{marginTop:"150px", padding:"20px", }}> 
              <Container>
                <Row>
                <Col className="vote-page" md={6} style={{color:"#fafafa"}} sm={12}>
                    <div>
                      <HeaderText style={{color:"#fff", paddingLeft:"0px",}}>Vote</HeaderText>
                     </div>
                    <div>
                      <div className="">
                        <h5 style={{margin:"20px 0"}}>Decentralized voting should be adopted worldwide</h5>
                        <p style={{color:"#666666", }}>Decide if you feel decentralized form of governance should be accepted in all ares of use and should be adopted for all to use.</p>
                      </div>
                      <div>
                        <ButtonGroup>
                          {radios.map((radio, idx) => (
                            <CustomToggleButton
                              key={idx}
                              id={`radio-${idx}`}
                              type="radio"
                              variant={"outline-secondary"}
                              name="radio"
                              value={radio.value}
                              checked={radioValue === radio.value}
                              onChange={(e) => setRadioValue(e.currentTarget.value)}
                              onClick={success}
                            >
                              {radio.name}
                            </CustomToggleButton>
                          ))}
                        </ButtonGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
                <CustomButton style={{padding:"15px", backgroundColor:"#3EA39E", position:"relative", bottom:"0px"}}>
                  Submit vote
                </CustomButton>
              </Container>
            </div>
            <FooterSection />
      </div>
    );
  }

export default VoteDetailsDashboard

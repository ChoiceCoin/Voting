import { React } from "react";
import styled from "styled-components";
import { Container, Col, Row, ButtonGroup, Button, ToggleButton } from 'react-bootstrap'


const Sidebar = styled.div`
background: #CDC392;

// box-shadow: 0px 1px 4px #D7D7D7;
// border-radius: 5px;
padding: 30px;
display: flex;
align-items: center;
flex-direction: column;
height: 96vh;
width: 100%
@media (max-width: 768px) {
    display: none !important;
}
`
const CustomToggleButton = styled(ToggleButton)`

&.btn-primary{
    color: black;
    box-shadow: none;
    padding-right: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid transparent;
   
};
&.btn-primary:not(:disabled):not(.disabled).active, 
.show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #424CA0 !important;
    border-color: #424CA0;
};
`
const CustomButtonGroup = styled(ButtonGroup)`
&.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle) {
    border-radius: 25px;
};
&.btn-group-vertical>.btn:not(:first-child) {
    border-radius: 25px;
}
`

const CustomIconHolder = styled.div`
padding-right: 20px; 
padding-left: 20px; 
display: flex;
    align-items: center;
justify-content: flex-start
`

const CustomLink = styled(Link)`
text-decoration: none;
width: 100%;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

const DashboardSidebar = props => {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    let { path, url } = useRouteMatch();

    console.log(url);
    console.log(radioValue)
    const radios = [
      { name: 'Vote', path:'',  value: '1' },
      { name: 'Create Poll', path: '/create-poll', value: '2' },
      { name: 'Rewards', path:'/rewards', value: '3' },
      { name: 'About Us', path:'/about', value: '4' },
      { name: 'settings', path:'/tools', value: '5' },
      { name: 'Logout', path:'/settings', iconLight: SettingsIconLight, iconDark: SettingsIconDark, value: '7' },
    ]; 
    
    // const history = useHistory();
    return (
        <>
        <Sidebar>
        <div style={{width: "100%"}}>
        <CustomButtonGroup toggle vertical style={{width: "100%",}}>
        {radios.map((radio, idx) => (
          <CustomToggleButton
            key={idx}
            style={{ textAlign:"center", }}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onClick={() => history.push(`${url}${radio.path}`)}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            <span id="RadioName">{radio.name}</span>
            <img style={{paddingRight: "20%", }} src={radioValue === radio.value ? radio.iconLight : radio.iconDark } alt="Sidebar Icon"/>  

            <HomeOutlined /> 
            
          </CustomToggleButton>
    
        ))}
        </CustomButtonGroup>
        </div>
        
        <div style={{marginTop: "50%", cursor:"pointer"}}>
            Log out 
            <img src={Logout} alt="logout-logo"/>
        </div>
        
        </Sidebar>
       
        </>
    )
}


export default DashboardSidebar
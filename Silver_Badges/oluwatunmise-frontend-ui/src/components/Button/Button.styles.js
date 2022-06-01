import styled from "styled-components"
import { Button } from 'react-bootstrap'
import { purple, white } from '../../utils/UITheme/UITheme'


const CustomButton = styled(Button)`
color: ${white};
background-color: ${props => props.primary ? purple : props.color};
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 15px;
width: ${props => props.width };
&:hover, &:focus, &:visited, &:disabled, &:active{
    color: ${white};
    background-color: ${props => props.primary ? purple : props.color};
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.3);
    transition: box-shadow 700ms;
}
`

export default CustomButton
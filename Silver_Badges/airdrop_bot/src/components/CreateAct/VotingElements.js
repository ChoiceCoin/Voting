import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Form = styled.div`
  width: 400px;
  height: 400px;
  background-color: yellow;
`;
export const Card = styled.div`
  padding: 20px;
  width: 100%;
  height: 200px;
  background-color: white;
`;
export const Input = styled.input`
  width: 70%;
  margin-top: 30px;
  margin-left: 16%;
  height: 70px;
  padding: 5px;
  border-radius: 5px;
  border-color: #378805;
`;
export const Input1 = styled.input`
  width: 50%;
  margin-top: 10px;
  height: 20px;
  padding: 5px;
  border-radius: 5px;
  border-color: #378805;
`;
export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#01BF71" : "#378805")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    bacckground: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }
`;
export const Tab = styled.div`
  width: 70%;
  margin-top: 60px;
  height: 20px;
  border-radius: 5px;
  padding: 5px;
  margin-left: 10%;
  display: flex;
  background: grey;
  border: solid;
  color: white;
  justify-content: space-between;
  border-color: #378805;
`;

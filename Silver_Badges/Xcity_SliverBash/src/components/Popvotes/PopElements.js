import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Formw = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  width: 100%;
  align-items: center;
  background: black;
`;
export const Conne = styled.div`
  position: absolute;
  margin-top: -355px;
  color: #000;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  background: #378805;
  max-height: 200px;
`;
export const Formlayout = styled.div`
  background: #fff;
  border-radius: 10px;
  height: 250px;
  width: 40%;
  font-size: 18px;
  z-index: 1000;
  padding: 10px;
  @media screen and (max-width: 768px) {
    width: 55%;
    transition: all 0.2s ease-in-out;
  }
`;

export const Main = styled.span`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
export const Connect = styled.span`
  color: #378805;
  margin-left: 30%;
  &:hover {
    font-size: 20px;
    transition: all 0.2s ease-in-out;
  }
`;

export const Input = styled.input`
  width: 70%;
  margin-top: 30px;
  margin-left: 16%;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
`;
export const Submit = styled.div`
  width: 20%;
  background: #01bf71;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 3px;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 40%;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

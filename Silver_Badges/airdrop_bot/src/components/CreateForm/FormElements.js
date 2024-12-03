import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormBack = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: rgb(49, 73, 1);
  background: linear-gradient(
    90deg,
    rgba(49, 73, 1, 1) 0%,
    rgba(42, 86, 194, 1) 0%,
    rgba(40, 90, 197, 1) 25%,
    rgba(37, 98, 201, 1) 40%,
    rgba(29, 120, 213, 1) 56%,
    rgba(10, 184, 227, 1) 94%,
    rgba(1, 195, 253, 1) 100%
  );
`;
export const MainForm = styled.div`
  width: 65%;
  height: 50%;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  align-self: center;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
export const ChoiceT = styled.div`
  width: 20%;
`;
export const H3 = styled.h3`
  align-self: center;
  padding-top: 10px;
`;

export const AnotherDiv = styled.form`
  display: flex;
  padding: 10px;
  margin-right: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  width: 30%;
  margin-top: 30px;
  margin-left: 16%;
  height: 20px;
  padding: 5px;
  border-radius: 5px;
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

export const Image = styled.img`
  background-image: url("https://gateway.pinata.cloud/ipfs/QmTHDy9RmrMSoNibX9EmBdnCKM2gKS3YXnpx29kzYhxtUM?preview=1");
`;

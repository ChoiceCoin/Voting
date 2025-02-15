import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}`;

const LoadingIcon = styled.div`
  display: block;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin: auto;

  span {
    box-sizing: border-box;
    content: "";
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    left: 0;
    border: 0.25rem solid var(--main-col);
    border-radius: 50%;
    border-top: 0.25rem solid transparent;
    animation: ${spin} 2s linear infinite;
  }
`;

const Loader: React.FC = () => {
  return (
    <LoadingIcon>
      <span></span>
    </LoadingIcon>
  );
};

export default Loader;

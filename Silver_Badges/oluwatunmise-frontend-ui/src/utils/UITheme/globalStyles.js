import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ProductSans;
  }
  a{
    text-decoration: none !important;
  }
  input, textarea, select {
    outline: none;
    box-shadow:none !important;
  }
`;

export default GlobalStyle;

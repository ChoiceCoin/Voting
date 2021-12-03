import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 .light {
   --background-color : #f8f9fa;
   --home-color : rgba(0, 0, 0, 0.45);
 }
 .dark {
   --background-color : #2a2f32;
   --home-color : rgb(166, 168, 170);
 }
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

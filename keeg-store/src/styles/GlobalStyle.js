import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  body {
    background-color: #F0F5F9;
    color: #1E2022;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-size: 16px;
  }

  div, input {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
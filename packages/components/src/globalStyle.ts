import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-size: 16px;
  }

  #root {
    display: flex;
    flex-direction: row;
    align-items: start;
  }

  div, input, header, section, main, aside {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

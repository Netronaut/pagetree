import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: normal;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  div, input {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover, &:focus-visible {
      transform: scale(1.1);
    }
    
    &:focus {
      outline: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

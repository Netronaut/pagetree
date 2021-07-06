import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    body {
      height: 100%;
      margin: 0;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;
      line-height: .9;

      #root {
        height: 100%;
      }
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
  }
`;

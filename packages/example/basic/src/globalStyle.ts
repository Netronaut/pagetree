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

      #root {
        height: 100%;
      }
    }
    button {
      line-height: .9;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover, &:focus-visible {
        transform: scale(1.2);
      }
      &:focus {
        outline: none;
      }
    }
  }
`;

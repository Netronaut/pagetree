import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    body {
      height: 100%;
      margin: 0;
      font-family: 'Gotham Pro';
      #root {
        height: 100%;
      }
    }
    button {
      font-family: 'Gotham Pro';
      font-size: 16px;
      font-weight: 400;
      line-height: 15px;
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

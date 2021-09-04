import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const BrandIcon = styled((props) => (
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <path
      strokeWidth="0"
      d="M6.12363 25.9284H1.99955C0.895404 25.9284 0 25.0352 0 23.9339V17.8257H8.12318V23.9339C8.12318 25.0352 7.22778 25.9284 6.12363 25.9284Z"
    />
    <path
      strokeWidth="0"
      d="M24.1196 1.99451V7.97802H19.3693C19.3363 7.352 18.8186 6.85611 18.1827 6.85611H0V1.99451C0 0.893144 0.895404 0 1.99955 0H22.12C23.2242 0 24.1196 0.893144 24.1196 1.99451Z"
    />
    <path
      strokeWidth="0"
      d="M24.1196 7.97803V14.0862C24.1196 15.1876 23.2242 16.0807 22.12 16.0807H0V9.22459H18.1827C18.5096 9.22459 18.8076 9.09309 19.0232 8.87802C19.2388 8.66295 19.3707 8.36707 19.3707 8.03967C19.3707 8.01912 19.3707 7.99858 19.3693 7.97803H24.1196Z"
    />
  </svg>
))<{ fill?: boolean }>`
  path {
    ${({ fill }) =>
      fill
        ? `
    &:nth-child(1) { fill: #39A7FF; }
    &:nth-child(2) { fill: #FF394B; }
    &:nth-child(3) { fill: #FFBD39; }
          `
        : `
    &:nth-child(1) { fill: #AAAAAA; }
    &:nth-child(2) { fill: #DDDDDD; }
    &:nth-child(3) { fill: #EEEEEE; }
          `}
  }
`;

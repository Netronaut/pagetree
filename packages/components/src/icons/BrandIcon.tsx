import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const BrandIcon = styled((props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 512 512"
    fill="none"
    {...omit(props, ['fill', 'stroke'])}
  >
    <path
      strokeWidth="0"
      d="M141.963 512H60.7268C38.9853 512 21.3333 494.371 21.3333 472.606V352H181.333V472.606C181.333 494.371 163.704 512 141.963 512Z"
    />
    <path
      strokeWidth="0"
      d="M490.667 157.867V276.34C490.667 298.104 473.038 315.733 451.273 315.733H21.3333V182.473L375.551 182.473C381.998 182.473 387.866 179.862 392.094 175.634C396.323 171.406 398.933 164.313 398.933 157.867C434.757 157.867 490.667 157.867 490.667 157.867Z"
    />
    <path
      strokeWidth="0"
      d="M490.667 39.3935V157.867H398.933C398.286 145.506 388.074 135.394 375.574 135.394H21.3333V39.3935C21.3333 17.6289 38.9622 0 60.7268 0H451.273C473.038 0 490.667 17.6289 490.667 39.3935Z"
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

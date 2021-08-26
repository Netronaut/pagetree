import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const AddIcon = styled((props) => (
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <polygon
      fill="#39A7FF"
      points="10 10 10 4 14 4 14 10 20 10 20 14 14 14 14 20 10 20 10 14 4 14 4 10"
    ></polygon>
  </svg>
))<{ fill?: boolean }>`
  path {
    ${({ fill }) =>
      fill
        ? `
    fill: #39A7FF;
          `
        : `
    fill: #AAAAAA;
          `}
  }
`;

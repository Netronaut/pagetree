import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const ShareIcon = styled((props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <g
      transform="translate(5.000000, 4.000000)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5,2 L2,2 C0.8954305,2 0,2.8954305 0,4 L0,13 C0,14.1045695 0.8954305,15 2,15 L11,15 C12.1045695,15 13,14.1045695 13,13 L13,10"></path>
      <path d="M7.43477052,7.56522948 L15,0"></path>
      <path d="M15,6 L15,0 L9,0"></path>
    </g>
  </svg>
))`
  g,
  path {
    stroke: ${({ stroke, theme }) => (stroke ? theme.color.secondary : theme.color.gray3)};
  }
`;

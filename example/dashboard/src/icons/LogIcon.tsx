import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const LogIcon = styled((props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <path
      d="M19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4Z"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M4 8H20" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M8 4V8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
))`
  path {
    stroke: ${({ stroke, theme }) => (stroke ? theme.color.secondary : theme.color.gray3)};
  }
`;

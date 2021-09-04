import React from 'react';
import omit from 'lodash.omit';
import styled from 'styled-components';

export const CloseIcon = styled((props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <path
      d="M4.5 4.5L19.5 19.5M4.5 19.5L19.5 4.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))<{ stroke?: boolean }>`
  path {
    stroke: ${({ stroke, theme }) => (stroke ? theme.color.secondary : theme.color.gray3)};
  }
`;

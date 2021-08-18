import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const SearchIcon = styled((props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <path
      d="M13.1743 15.6364C9.74531 15.6364 6.96552 12.7873 6.96552 9.27275C6.96552 5.75822 9.74531 2.90912 13.1743 2.90912C16.6034 2.90912 19.3832 5.75822 19.3832 9.27275C19.3832 12.7873 16.6034 15.6364 13.1743 15.6364Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.41759 19.2727L8.73944 13.8182"
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

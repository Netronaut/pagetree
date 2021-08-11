import React from 'react';
import styled from 'styled-components';
import omit from 'lodash.omit';

export const StarIcon = styled((props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...omit(props, ['fill', 'stroke'])}>
    <g transform="translate(2 1)">
      <path
        d="M10.2594 15.5658L4.5365 18.5668L5.62971 12.2106L1 7.70951L7.39796 6.78285L10.2594 1L13.1209 6.78285L19.5189 7.70951L14.8891 12.2106L15.9824 18.5668L10.2594 15.5658Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
))`
  ${({ fill, stroke, theme }) => `
    path {
      stroke: ${stroke ? theme.color.secondary : theme.color.gray3}};
      fill: ${
        fill
          ? `var(--icon-button-hover-color, ${stroke ? theme.color.secondary : theme.color.gray3})`
          : 'none'
      };
    }
  `}
`;

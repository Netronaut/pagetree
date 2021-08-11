import React, { ReactElement } from 'react';

export interface StarIconProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
}
export const StarIcon = ({
  isSelected = false,
  width = 21,
  height = 20,
}: StarIconProps): ReactElement => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill={isSelected ? '#39A7FF' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2594 15.5658L4.5365 18.5668L5.62971 12.2106L1 7.70951L7.39796 6.78285L10.2594 1L13.1209 6.78285L19.5189 7.70951L14.8891 12.2106L15.9824 18.5668L10.2594 15.5658Z"
      stroke="#39A7FF"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

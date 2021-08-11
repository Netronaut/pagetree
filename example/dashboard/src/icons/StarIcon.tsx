import React, { ReactElement } from 'react';

interface StarIconProps {
  isFilled?: boolean;
  isOutlined?: boolean;
  width?: number;
  height?: number;
}
export const StarIcon = ({
  isFilled = false,
  isOutlined = true,
  width = 21,
  height = 20,
}: StarIconProps): ReactElement => {
  const color = isOutlined ? '#39A7FF' : '#C2C2C2';
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill={isFilled ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2594 15.5658L4.5365 18.5668L5.62971 12.2106L1 7.70951L7.39796 6.78285L10.2594 1L13.1209 6.78285L19.5189 7.70951L14.8891 12.2106L15.9824 18.5668L10.2594 15.5658Z"
        stroke={isOutlined ? '#39A7FF' : '#C2C2C2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

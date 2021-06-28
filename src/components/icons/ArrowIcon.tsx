import React, { ReactElement } from 'react';

export interface ArrowIconProps {
  isOpen: boolean;
}

export const ArrowIcon = ({ isOpen }: ArrowIconProps): ReactElement => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6L6 1L11 6"
      stroke={isOpen ? '#6A6A6A' : '#F9F9F9'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

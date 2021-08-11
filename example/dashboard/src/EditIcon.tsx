import React, { ReactElement } from 'react';

export interface DeleteIconProps {
  isSelected?: boolean;
}
export const EditIcon = ({ isSelected = false }: DeleteIconProps): ReactElement => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isSelected ? '#39A7FF' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20H8L18.5 9.5C19.0304 8.96956 19.3284 8.25014 19.3284 7.5C19.3284 6.74985 19.0304 6.03043 18.5 5.5C17.9696 4.96956 17.2501 4.67157 16.5 4.67157C15.7499 4.67157 15.0304 4.96956 14.5 5.5L4 16V20Z"
      stroke="#5F9EFC"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.5 6.5L17.5 10.5"
      stroke="#5F9EFC"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

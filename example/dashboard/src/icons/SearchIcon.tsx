import React from 'react';

export interface SearchIconProps {
  isOutlined?: boolean;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ isOutlined }) => (
  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.1743 15.6364C9.74531 15.6364 6.96552 12.7873 6.96552 9.27275C6.96552 5.75822 9.74531 2.90912 13.1743 2.90912C16.6034 2.90912 19.3832 5.75822 19.3832 9.27275C19.3832 12.7873 16.6034 15.6364 13.1743 15.6364Z"
      stroke={isOutlined ? '#39A7FF' : '#AAAAAA'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.41759 19.2727L8.73944 13.8182"
      stroke={isOutlined ? '#39A7FF' : '#AAAAAA'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

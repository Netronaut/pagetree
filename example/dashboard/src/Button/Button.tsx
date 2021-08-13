import React, { ReactElement } from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps {
  children: ReactElement | string;
  color?: 'primary' | 'secondary' | 'transparent';
  onClick: () => void;
}

export const Button = ({ children, color = 'primary', onClick }: ButtonProps): ReactElement => (
  <StyledButton color={color} onClick={onClick}>
    {children}
  </StyledButton>
);

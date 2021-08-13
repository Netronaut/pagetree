import React, { ReactElement } from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps {
  children: ReactElement | string;
  color?: 'primary' | 'secondary' | 'transparent';
}

export const Button = ({ children, color = 'primary' }: ButtonProps): ReactElement => (
  <StyledButton color={color}>{children}</StyledButton>
);

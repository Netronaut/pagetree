import React, { ReactElement } from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  children: ReactElement | string;
  primary?: boolean;
}

export const Button = ({ children }: ButtonProps): ReactElement => (
  <StyledButton>{children}</StyledButton>
);

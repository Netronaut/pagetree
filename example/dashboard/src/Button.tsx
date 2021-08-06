import React, { ReactElement } from 'react'

interface ButtonProps {
  children: ReactElement;
  primary?: boolean;
}

export const Button = ({ children }: ButtonProps) => <button>{children}</button>

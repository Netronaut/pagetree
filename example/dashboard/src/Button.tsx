import React, { ReactElement } from 'react';

interface ButtonProps {
  children: ReactElement | string;
  primary?: boolean;
}

export const Button = ({ children }: ButtonProps): ReactElement => <button>{children}</button>;

import React, { InputHTMLAttributes, ReactElement } from 'react';
import { InputElement, InputRoot } from './Input.styles';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactElement;
};

export const Input = ({ icon, ...props }: InputProps): ReactElement => (
  <InputRoot hasIcon={Boolean(icon)}>
    {icon}
    <InputElement {...props} hasIcon={Boolean(icon)} />
  </InputRoot>
);

import React, { InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';
import { Default } from '../Typography';
import { InputRoot } from './Input.styles';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactElement;
};

const InputElement = styled(Default).attrs({
  as: 'input',
})<InputProps>`
  border-radius: 4px;
  border: none;
  padding: 0.8rem;

  ${({ icon }) => (icon ? `padding-left: 2.5rem;` : '')}

  background: ${({ theme }) => theme.color.gray4};
  color: ${({ theme }) => theme.color.gray2};
  width: 100%;
  outline-color: ${({ theme }) => `${theme.color.secondary}`};
`;

export const Input = (props: InputProps): ReactElement => (
  <InputRoot icon={Boolean(props.icon)}>
    <InputElement {...props} />
    {props.icon}
  </InputRoot>
);

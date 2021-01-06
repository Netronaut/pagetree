import React from 'react';
import { ComponentContainer, Input } from './componentsStyles';

type Props = {
  id: string;
};

export const Text = ({ id }: Props) => {
  return (
    <ComponentContainer id={id}>
      <Input type="text" value={id} readOnly />
    </ComponentContainer>
  );
};

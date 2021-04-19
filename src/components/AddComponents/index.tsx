import React from 'react';
import { AddComponentsWrapper } from './componentsStyles';

type Props = {
  isOpen: boolean,
  setIsOpen: (val: boolean) => void,
};

export const AddComponents: React.FC<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <AddComponentsWrapper>
      <button onClick={() => setIsOpen(true)}>+</button>
      <p>Add components</p>
    </AddComponentsWrapper>
  );
};

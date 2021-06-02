import React from 'react';
import { AddComponentsWrapper } from './componentsStyles';

type Props = {
  onModalShow: () => void;
};

export const AddComponents: React.FC<Props> = ({ onModalShow }) => {
  return (
    <AddComponentsWrapper>
      <button onClick={onModalShow}>+</button>
      <p>Add components</p>
    </AddComponentsWrapper>
  );
};

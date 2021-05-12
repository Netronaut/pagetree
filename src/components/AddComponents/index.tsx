import React from 'react';
import { AddComponentsWrapper } from './componentsStyles';

type Props = {
  setIsModalOpen: () => void,
};

export const AddComponents: React.FC<Props> = ({
  setIsModalOpen,
}) => {
  return (
    <AddComponentsWrapper>
      <button onClick={setIsModalOpen}>+</button>
      <p>Add components</p>
    </AddComponentsWrapper>
  );
};

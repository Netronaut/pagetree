import React from 'react';
import { AddComponentsWrapper } from './componentsStyles';

type Props = {
  showCatalog: () => void,
};

export const AddComponents: React.FC<Props> = ({
  showCatalog,
}) => {
  return (
    <AddComponentsWrapper>
      <button onClick={showCatalog}>+</button>
      <p>Add components</p>
    </AddComponentsWrapper>
  );
};

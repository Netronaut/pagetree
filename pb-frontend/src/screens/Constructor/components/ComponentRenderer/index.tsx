import React from 'react';
import { Indicator, MainContainer } from './componentsStyles';
import { useDragAndDrop } from 'src/hooks/useDragAndDrop';
import { Item } from 'src/utils/tree';
import { componentByType } from '../../../../utils/componentTypes';

type ContainerProps = {
  component: Item;
};

export const ComponentRenderer: React.FC<ContainerProps> = ({ component }) => {
  const { id, type } = component;

  const Component = componentByType[type];

  const {
    onDragLeave,
    onDragStart,
    onDragOver,
    onDrop,
    insertTo,
  } = useDragAndDrop({ id });

  return (
    <MainContainer
      {...{
        draggable: true,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
      }}
    >
      <Indicator position={insertTo} />
      <Component id={id} />
    </MainContainer>
  );
};

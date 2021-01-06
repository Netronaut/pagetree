import React from 'react';
import { Component } from '../../types';
import { Indicator, MainContainer } from './componentsStyles';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

export type DroppableComponent = React.ComponentType<DroppableComponentProps>;

type ContainerProps = {
  Component: DroppableComponent;
  id: string;
  element: Component;
};

type DroppableComponentProps = {
  element: Component;
};

const Container: React.FC<ContainerProps> = ({ Component, id, element }) => {
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
      <Component element={element} />
    </MainContainer>
  );
};

export default Container;

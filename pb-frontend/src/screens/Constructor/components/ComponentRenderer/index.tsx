import React from 'react';
import { Indicator, Container } from './componentsStyles';
import { useDragAndDrop } from 'src/hooks/useDragAndDrop';
import { Item, TSide } from 'src/utils/tree';
import { componentByType } from 'src/utils/componentTypes';

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
  } = useDragAndDrop(id);

  return (
    <Container
      id={id}
      insertTo={insertTo}
      {...{
        draggable: true,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
      }}
    >
      <Indicator position={insertTo} />
      <Component
        id={id}
        pointerEventsDisabled={insertTo && insertTo !== TSide.undetermined}
      />
    </Container>
  );
};

import React from 'react';
import { Indicator, Container } from './componentsStyles';
import { useDragAndDrop } from 'hooks';
import { ChildComponent } from 'utils/tree';
import { componentByType } from 'utils/componentTypes';

type Props = {
  component: ChildComponent;
};

export const ComponentRenderer: React.FC<Props> = ({ component }) => {
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
      background={Component.background}
      {...{
        draggable: true,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
      }}
    >
      <Indicator position={insertTo} />
      <Component id={id} type={type} />
    </Container>
  );
};

import React from 'react';
import { DroppableComponentContainer } from './componentsStyles';
import { useDragAndDrop } from 'hooks/useDragAndDrop';
import { components } from 'utils/componentTypes';

export const Catalog = () => {
  const { onDragStart } = useDragAndDrop();
  return (
    <>
      {components?.map((c, i) => (
        <DroppableComponentContainer
          id={c.type}
          key={`droppable-component-${i}`}
          {...{
            draggable: true,
            onDragStart,
          }}
        >
          {c.componentName}
        </DroppableComponentContainer>
      ))}
    </>
  );
};

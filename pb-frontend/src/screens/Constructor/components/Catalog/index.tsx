import React from 'react';
import { DroppableComponentContainer } from './componentsStyles';
import { useDragAndDrop } from 'src/hooks/useDragAndDrop';

const components = [
  {
    text: 'Text',
    type: 'text',
  },
];

const Catalog = () => {
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
          {c.text}
        </DroppableComponentContainer>
      ))}
    </>
  );
};

export default Catalog;

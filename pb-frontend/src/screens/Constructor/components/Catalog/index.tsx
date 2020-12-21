import React from 'react';
import { DroppableComponentContainer } from './componentsStyles';

const components = [
  {
    text: 'Text',
    type: 'text',
  },
];

const Catalog = () => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('itemId', e.currentTarget.id);

    const itemView = document.getElementById(e.currentTarget.id);
    if (itemView) {
      e.dataTransfer.setDragImage(itemView, 0, 0);
    }
  };

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

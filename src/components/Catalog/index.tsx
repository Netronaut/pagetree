import React from 'react';
import { DroppableComponentContainer } from './componentsStyles';
import { GroupWrapper } from './GroupWrapper';
import { useDragAndDrop } from '../../hooks';
import { Components } from '../../hocs/createCatalogComponent';

type Props = {
  components?: Components;
};

export const Catalog: React.FC<Props> = ({ components }) => {
  const { onDragStart } = useDragAndDrop();
  return (
    <GroupWrapper>
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
    </GroupWrapper>
  );
};

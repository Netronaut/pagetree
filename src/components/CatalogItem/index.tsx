import React, { useState } from 'react';
import { StyledGroupWrapper, DropdownButton } from './componentsStyles';
import { DroppableComponentContainer } from './componentsStyles';
import { TComponentGroup } from '../../hocs/createCatalogComponent';
import { useDragAndDrop } from '../../hooks';

type Props = {
  group: TComponentGroup
};

export const CatalogItem: React.FC<Props> = ({ group }) => {
  const { onDragStart } = useDragAndDrop();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledGroupWrapper isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {group.name}
        <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <img src='arrow.2ff401d5.svg' alt='arrow' />
        </DropdownButton>
      </header>
      <section>
        {group.components?.map((component, i) => (
          <DroppableComponentContainer
            id={component.type}
            key={`droppable-component-${i}`}
            {...{
              draggable: true,
              onDragStart,
            }}
          >
            {component.componentName}
          </DroppableComponentContainer>
        )
        )}
      </section>
    </StyledGroupWrapper>
  );
};

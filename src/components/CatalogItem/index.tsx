import React, { useState } from 'react';
import { StyledGroupWrapper, DropdownButton } from './componentsStyles';
import { DroppableComponentContainer } from './componentsStyles';
import { TComponentGroup } from '../../hocs/createCatalogComponent';
import { useDragAndDrop } from '../../hooks';

type Props = {
  group: TComponentGroup
};

const ArrowSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6L6 1L11 6" stroke={isOpen ? "#6A6A6A" : "#F9F9F9"} stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const CatalogItem: React.FC<Props> = ({ group }) => {
  const { onDragStart } = useDragAndDrop();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledGroupWrapper isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {group.name}
        <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <ArrowSvg isOpen={isOpen}/>
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
import React, { useState, useContext } from 'react';
import { StyledGroupWrapper, DropdownButton, StyledCatalogWrapper } from './componentsStyles';
import { DroppableComponentContainer } from './componentsStyles';
import { useDragAndDrop } from '../../hooks';
import { TreeContext } from '../../utils/context';

const ArrowSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width='12'
    height='7'
    viewBox='0 0 12 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1 6L6 1L11 6'
      stroke={isOpen ? '#6A6A6A' : '#F9F9F9'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

type Props = {
  groupName?: string;
};

export const CatalogItem: React.FC<Props> = ({ groupName }) => {
  const { onDragStart } = useDragAndDrop();
  const [isOpen, setIsOpen] = useState(false);
  const { components } = useContext(TreeContext);

  const filtered = components?.filter((component) => {
    const { groupName: groupNameFromFilter } = component;
    if (groupName === groupNameFromFilter) return component;
  });

  return (
    <StyledGroupWrapper isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {groupName}
        <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <ArrowSvg isOpen={isOpen} />
        </DropdownButton>
      </header>
      <section>
        {filtered?.map((component, i) => (
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
        ))}
      </section>
    </StyledGroupWrapper>
  );
};

export const Catalog: React.FC = () => {
  const { componentGroups } = useContext(TreeContext);
  return (
    <StyledCatalogWrapper>
      {componentGroups?.map(groupName =>
        <CatalogItem key={groupName} groupName={groupName} />
      )}
    </StyledCatalogWrapper>
  );
}

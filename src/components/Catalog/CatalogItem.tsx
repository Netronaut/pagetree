import React, { useState, useContext } from 'react';
import { StyledGroupWrapper, DropdownButton } from './componentsStyles';
import { DroppableComponentContainer } from './componentsStyles';
import { useDragAndDrop } from '../../hooks';
import { TreeContext } from '../../utils/context';

type Props = {
  groupName: string;
  onOpenGroup: (groupName: string) => void;
  openedGroup: string;
};

export const CatalogItem: React.FC<Props> = ({
  groupName,
  onOpenGroup,
  openedGroup,
}) => {
  const { onDragStart } = useDragAndDrop();
  const { components } = useContext(TreeContext);
  const isOpen = groupName === openedGroup;

  const filtered = components?.filter(component => {
    const { groupName: groupNameFromFilter } = component;
    if (groupName === groupNameFromFilter) return component;
  });

  const handleToggle = (isOpen: boolean) => {
    !isOpen ? onOpenGroup(groupName) : onOpenGroup('');
  };

  return (
    <StyledGroupWrapper isOpen={isOpen}>
      <header onClick={() => handleToggle(isOpen)}>
        {groupName}
        <DropdownButton isOpen={isOpen}>
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

const ArrowSvg: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 6L6 1L11 6"
      stroke={isOpen ? '#6A6A6A' : '#F9F9F9'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

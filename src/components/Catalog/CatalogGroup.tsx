import React, { ReactElement, useContext } from 'react';
import { useDragAndDrop } from '../../hooks';
import { ArrowIcon } from '../icons';
import { TreeContext } from '../PageTree';
import { CatalogGroupContainer, CatalogItem, DropdownButton } from './Catalog.styles';

interface CatalogGroupProps {
  groupName: string;
  onOpenGroup: (groupName: string) => void;
  openedGroup: string;
}

export const CatalogGroup = ({
  groupName,
  onOpenGroup,
  openedGroup,
}: CatalogGroupProps): ReactElement => {
  const { onDragStart } = useDragAndDrop();
  const { components } = useContext(TreeContext);
  const isOpen = groupName === openedGroup;

  const handleToggle = (isOpen: boolean) => {
    !isOpen ? onOpenGroup(groupName) : onOpenGroup('');
  };

  return (
    <CatalogGroupContainer isOpen={isOpen}>
      <header onClick={() => handleToggle(isOpen)}>
        {groupName}
        <DropdownButton isOpen={isOpen}>
          <ArrowIcon isOpen={isOpen} />
        </DropdownButton>
      </header>
      <section>
        {components
          ?.filter((component) => component.groupName === groupName)
          .map((component, i) => (
            <CatalogItem
              id={component.type}
              key={`droppable-component-${i}`}
              draggable
              onDragStart={onDragStart}
            >
              {component.componentName}
            </CatalogItem>
          ))}
      </section>
    </CatalogGroupContainer>
  );
};

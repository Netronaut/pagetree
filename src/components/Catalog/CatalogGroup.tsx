import React, { ReactElement, useContext } from 'react';
import { useDragAndDrop } from '../../hooks';
import { TreeContext } from '../../utils/context';
import { ArrowIcon } from '../icons';
import S from './Catalog.styles';

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
    <S.CatalogGroup isOpen={isOpen}>
      <header onClick={() => handleToggle(isOpen)}>
        {groupName}
        <S.DropdownButton isOpen={isOpen}>
          <ArrowIcon isOpen={isOpen} />
        </S.DropdownButton>
      </header>
      <section>
        {components
          ?.filter((component) => component.groupName === groupName)
          .map((component, i) => (
            <S.CatalogItem
              id={component.type}
              key={`droppable-component-${i}`}
              draggable
              onDragStart={onDragStart}
            >
              {component.componentName}
            </S.CatalogItem>
          ))}
      </section>
    </S.CatalogGroup>
  );
};

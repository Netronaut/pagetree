import React, { ReactElement, useContext } from 'react';
import { useDragAndDrop } from '../../hooks';
import { TreeContext } from '../PageTree';
import { CatalogItem } from './Catalog.styles';

interface FilteredCatalogListProps {
  searchValue: string;
}

export const FilteredCatalogList = ({ searchValue }: FilteredCatalogListProps): ReactElement => {
  const { components } = useContext(TreeContext);
  const { onDragStart } = useDragAndDrop();

  return (
    <>
      {components
        ?.filter(
          ({ componentName }) =>
            searchValue === '' ||
            componentName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )
        .map(({ componentName, type }, i) => (
          <CatalogItem
            id={type}
            key={`droppable-component-${i}`}
            draggable
            onDragStart={onDragStart}
          >
            {componentName}
          </CatalogItem>
        ))}
    </>
  );
};

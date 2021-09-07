import React, { ReactElement, useContext } from 'react';
import { PageTreeStateContext } from '../../provider';
import { useDrag } from '../../dragAndDrop';
import { CatalogItem } from './Catalog.styles';

interface FilteredCatalogListProps {
  searchValue: string;
}

export const FilteredCatalogList = ({ searchValue }: FilteredCatalogListProps): ReactElement => {
  const { components } = useContext(PageTreeStateContext);

  return (
    <>
      {components
        ?.filter(
          ({ label, type }) =>
            searchValue === '' ||
            (label || type).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )
        .map((item, i) => (
          <CatalogItem
            key={`catalog-item-${i}`}
            data-component-description={JSON.stringify({ type: item.type })}
            {...useDrag()}
          >
            {item.label || item.type}
          </CatalogItem>
        ))}
    </>
  );
};

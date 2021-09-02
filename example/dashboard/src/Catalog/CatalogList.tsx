import React, { ReactElement } from 'react';
import { useDrag, CatalogComponent } from '@pagio/builder';
import { CatalogItem } from './Catalog.styles';

interface CatalogListProps {
  searchValue: string;
  components: Array<CatalogComponent>;
}

export const CatalogList = ({ searchValue, components }: CatalogListProps): ReactElement => {
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
            <div>{item.label || item.type}</div>
          </CatalogItem>
        ))}
    </>
  );
};

import React, { ReactElement, useContext, useState } from 'react';
import { TreeContext } from '../../utils/context';
import { CatalogGroup } from './CatalogGroup';
import { FilteredCatalogList } from './FilteredCatalogList';
import S from './Catalog.styles';

export interface CatalogProps {
  searchValue: string;
}

export const Catalog = ({ searchValue }: CatalogProps): ReactElement => {
  const { componentGroups } = useContext(TreeContext);
  const [openedGroup, setOpenedGroup] = useState('');

  const onOpenGroup = (groupName: string) => {
    setOpenedGroup(groupName);
  };

  return (
    <S.Catalog>
      {searchValue ? (
        <FilteredCatalogList searchValue={searchValue} />
      ) : (
        componentGroups?.map((groupName) => (
          <CatalogGroup
            key={groupName}
            groupName={groupName}
            onOpenGroup={onOpenGroup}
            openedGroup={openedGroup}
          />
        ))
      )}
    </S.Catalog>
  );
};

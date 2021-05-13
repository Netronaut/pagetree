import React, { useContext, useState } from 'react';
import { TreeContext } from '../../utils/context';
import { StyledCatalogWrapper } from './componentsStyles';
import { CatalogItem } from './CatalogItem';
import { SearchList } from './SearchList';

type Props = {
  searchValue: string;
};

export const Catalog: React.FC<Props> = ({ searchValue }) => {
  const { componentGroups } = useContext(TreeContext);
  const [openedGroup, setOpenedGroup] = useState('');

  const onOpenGroup = (groupName: string) => {
    setOpenedGroup(groupName);
  };

  return (
    <StyledCatalogWrapper>
      {searchValue && <SearchList searchValue={searchValue} />}
      {componentGroups?.map(groupName =>
        <CatalogItem
          key={groupName}
          groupName={groupName}
          onOpenGroup={onOpenGroup}
          openedGroup={openedGroup}
        />
      )}
    </StyledCatalogWrapper>
  );
};

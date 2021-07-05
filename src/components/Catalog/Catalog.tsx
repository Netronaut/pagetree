import React, { ReactElement, useContext, useState } from 'react';
import { TreeContext } from '../../utils/context';
import { Modal, ModalButton, ModalHeadline } from '../Modal';
import { SearchIcon } from '../icons';
import { SearchBox } from './SearchBox';
import { FilteredCatalogList } from './FilteredCatalogList';
import { CatalogGroup } from './CatalogGroup';
import S from './Catalog.styles';

interface CatalogProps {
  onModalClose: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  openedGroup: string;
  setOpenedGroup: (groupName: string) => void;
}

export const Catalog = ({
  onModalClose,
  searchValue,
  setSearchValue,
  openedGroup,
  setOpenedGroup,
}: CatalogProps): ReactElement => {
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
  };

  const { componentGroups } = useContext(TreeContext);
  const onOpenGroup = (groupName: string) => {
    setOpenedGroup(groupName);
  };

  return (
    <Modal onClose={onModalClose} position="bottom-left">
      <ModalHeadline>Components</ModalHeadline>
      <SearchBox>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          autoFocus
        />
        <ModalButton>
          <SearchIcon />
        </ModalButton>
      </SearchBox>

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
    </Modal>
  );
};

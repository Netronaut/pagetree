import React, { ReactElement, useMemo } from 'react';
import { Modal, ModalButton, ModalHeadline } from '../Modal';
import { SearchIcon } from '../icons';
import { FilteredCatalogList } from './FilteredCatalogList';
import { CatalogGroup } from './CatalogGroup';
import { SearchBox } from './SearchBox';

import { CatalogComponent } from './Catalog.types';
import { CatalogContainer } from './Catalog.styles';

interface CatalogProps {
  components?: Array<CatalogComponent>;
  onModalClose: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  openedGroup: string;
  setOpenedGroup: (groupName: string) => void;
}

export const Catalog = ({
  components = [],
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

  const componentGroups = useMemo(
    () =>
      Array.from(
        new Set(
          components
            .map((component) => component.groupName)
            .filter((componentName) => componentName !== undefined) as Array<string>,
        ),
      ),
    [components],
  );

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

      <CatalogContainer>
        {searchValue ? (
          <FilteredCatalogList searchValue={searchValue} />
        ) : (
          componentGroups.map((groupName) => (
            <CatalogGroup
              key={groupName}
              groupName={groupName}
              onOpenGroup={onOpenGroup}
              openedGroup={openedGroup}
            />
          ))
        )}
      </CatalogContainer>
    </Modal>
  );
};

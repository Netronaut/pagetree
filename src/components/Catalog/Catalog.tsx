import React, { ReactElement, useState } from 'react';
import { Modal, ModalButton, ModalHeadline } from '../Modal';
import { SearchIcon } from '../icons';
import { FilteredCatalogList } from './FilteredCatalogList';
import { SearchBox } from './SearchBox';

import { CatalogContainer } from './Catalog.styles';

export const Catalog = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
  };

  return (
    <Modal position="bottom-left">
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
        <FilteredCatalogList searchValue={searchValue} />
      </CatalogContainer>
    </Modal>
  );
};

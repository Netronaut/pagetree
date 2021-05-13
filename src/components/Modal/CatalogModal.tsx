import React, { useState } from 'react';
import { ModalButton, ModalH2, SearchBox } from './componentsStyles';
import { Catalog } from '../CatalogItem';
import { Modal } from '.';

type Props = {
  onModalClose: () => void;
};

export const CatalogModal: React.FC<Props> = ({ onModalClose }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
  };

  return (
    <Modal onClose={onModalClose} isAddComponents>
      <ModalH2>Components</ModalH2>
      <SearchBox>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          autoFocus
        />
        <ModalButton><img src="search.7845d0e5.svg" alt="search" /></ModalButton>
      </SearchBox>
      <Catalog searchValue={searchValue} />
    </Modal>
  );
};
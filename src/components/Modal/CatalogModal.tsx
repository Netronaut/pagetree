import React, { useState } from 'react';
import { ModalButton, ModalH2, SearchBox } from './componentsStyles';
import { Catalog } from '../Catalog';
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
        <ModalButton>
          <Search />
        </ModalButton>
      </SearchBox>
      <Catalog searchValue={searchValue} />
    </Modal>
  );
};

const Search: React.FC = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 16L11 11M12.6667 6.83333C12.6667 7.59938 12.5158 8.35792 12.2226 9.06565C11.9295 9.77339 11.4998 10.4164 10.9581 10.9581C10.4164 11.4998 9.77339 11.9295 9.06565 12.2226C8.35792 12.5158 7.59938 12.6667 6.83333 12.6667C6.06729 12.6667 5.30875 12.5158 4.60101 12.2226C3.89328 11.9295 3.25022 11.4998 2.70854 10.9581C2.16687 10.4164 1.73719 9.77339 1.44404 9.06565C1.15088 8.35792 1 7.59938 1 6.83333C1 5.28624 1.61458 3.80251 2.70854 2.70854C3.80251 1.61458 5.28624 1 6.83333 1C8.38043 1 9.86416 1.61458 10.9581 2.70854C12.0521 3.80251 12.6667 5.28624 12.6667 6.83333Z"
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

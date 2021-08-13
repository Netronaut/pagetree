import React, { ReactElement, useState } from 'react';
import { SearchIcon } from '../icons';
import { SearchBox } from './InputSearch.styles';

export interface InputSearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const InputSearch = ({ searchValue, setSearchValue }: InputSearchProps): ReactElement => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
  };

  return (
    <SearchBox onSelect={() => setIsSelected(true)} onBlur={() => setIsSelected(false)}>
      <input type="text" placeholder="Search" value={searchValue} onChange={handleSearch} />
      <SearchIcon isOutlined={isSelected} />
    </SearchBox>
  );
};

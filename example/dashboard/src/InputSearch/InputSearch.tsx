import React, { ReactElement, useState } from 'react';
import { SearchIcon } from '../icons';
import { SearchBox } from './InputSearch.styles';

export const InputSearch = (): ReactElement => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SearchBox onSelect={() => setIsSelected(true)} onBlur={() => setIsSelected(false)}>
      <input placeholder="Search" />
      <SearchIcon isOutlined={isSelected} />
    </SearchBox>
  );
};

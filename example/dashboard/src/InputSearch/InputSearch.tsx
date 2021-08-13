import React, { ReactElement } from 'react';
import { SearchIcon } from '../icons';
import { SearchBox } from './InputSearch.styles';

export const InputSearch = (): ReactElement => (
  <SearchBox>
    <input placeholder="Search" />
    <SearchIcon />
  </SearchBox>
);

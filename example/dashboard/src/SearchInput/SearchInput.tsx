import React, { ReactElement } from 'react';
import { SearchIcon } from '../icons';
import { SearchInputRoot, Input } from './SearchInput.styles';

interface SearchInputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = ({
  value = '',
  onChange = () => undefined,
}: SearchInputProps): ReactElement => (
  <SearchInputRoot>
    <Input placeholder="Search" value={value} onChange={onChange} />
    <SearchIcon />
  </SearchInputRoot>
);

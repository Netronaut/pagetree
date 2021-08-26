import React, { ReactElement } from 'react';
import { SearchIcon } from '../icons';
import { Input } from '../Input';

interface SearchInputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = ({
  value = '',
  onChange = () => undefined,
}: SearchInputProps): ReactElement => (
  <Input placeholder="Search" value={value} onChange={onChange} icon={<SearchIcon />} />
);

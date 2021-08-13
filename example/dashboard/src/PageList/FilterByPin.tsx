import React from 'react';
import { StarIcon } from '../icons';
import { IconWrapperButton } from './PageList.styles';

type Props = {
  isFilterActive: boolean;
  setIsFilterActive: (val: boolean) => void;
};

export const FilterByPin: React.FC<Props> = ({ isFilterActive, setIsFilterActive }) => (
  <h2>
    {!isFilterActive ? 'All Pages' : 'Pined Pages'}
    <IconWrapperButton onClick={() => setIsFilterActive(!isFilterActive)}>
      <StarIcon isOutlined={false} isFilled={isFilterActive} />
    </IconWrapperButton>
  </h2>
);

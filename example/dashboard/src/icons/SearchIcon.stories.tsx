import React, { ReactElement } from 'react';
import { SearchIcon, SearchIconProps } from './SearchIcon';

export const defauld = (): ReactElement => <SearchIcon />;

export const blue = (args: SearchIconProps): ReactElement => <SearchIcon {...args} />;

blue.args = {
  isOutlined: true,
};

export default {
  title: 'Icons/SearchIcon',
  component: SearchIcon,
};

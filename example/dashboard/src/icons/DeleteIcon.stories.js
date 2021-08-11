import React from 'react';
import { DeleteIcon } from './DeleteIcon';

export default {
  title: 'Icons/DeleteIcon',
  component: DeleteIcon,
};

export const blue = (args) => <DeleteIcon {...args} />;

blue.args = {
  isOutlined: true,
};

export const gray = (args) => <DeleteIcon {...args} />;

gray.args = {
  isOutlined: false,
};

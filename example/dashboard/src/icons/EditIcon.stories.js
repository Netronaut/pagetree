import React from 'react';
import { EditIcon } from './EditIcon';

export default {
  title: 'Icons/EditIcon',
  component: EditIcon,
};

export const blue = (args) => <EditIcon {...args} />;

blue.args = {
  isOutlined: true,
};

export const gray = (args) => <EditIcon {...args} />;

gray.args = {
  isOutlined: false,
};

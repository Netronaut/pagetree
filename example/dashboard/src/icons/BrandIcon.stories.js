import React from 'react';
import { BrandIcon } from './BrandIcon';

export default {
  title: 'Icons/BrandIcon',
  component: BrandIcon,
};

export const colors = (args) => <BrandIcon {...args} />;

colors.args = {
  isActive: true,
};

export const gray = (args) => <BrandIcon {...args} />;

gray.args = {
  isActive: false,
};
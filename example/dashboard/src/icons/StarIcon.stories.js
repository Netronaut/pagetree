import React from 'react';
import { StarIcon } from './StarIcon';

export default {
  title: 'Icons/StarIcon',
  component: StarIcon,
};

export const blue = (args) => <StarIcon {...args} />;

blue.args = {
  isFilled: false,
  isOutlined: true,
  width: 21,
  height: 20,
};

export const blueIsSelected = (args) => <StarIcon {...args} />;

blueIsSelected.args = {
  isFilled: true,
  isOutlined: true,
  width: 21,
  height: 20,
};

export const gray = (args) => <StarIcon {...args} />;

gray.args = {
  isFilled: false,
  isOutlined: false,
  width: 24,
  height: 24,
};

export const grayIsSelected = (args) => <StarIcon {...args} />;

grayIsSelected.args = {
  isFilled: true,
  isOutlined: false,
  width: 24,
  height: 24,
};

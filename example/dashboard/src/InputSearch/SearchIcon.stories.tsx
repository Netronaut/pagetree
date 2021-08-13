import React, { ReactElement } from 'react';
import { InputSearch, InputSearchProps } from './InputSearch';

export default {
  title: 'Example/InputSearch',
  component: InputSearch,
};

export const InputDefault = (args: InputSearchProps): ReactElement => <InputSearch {...args} />;

import React from 'react';
import { Input } from './componentsStyles';

type Props = {
  id: string;
  pointerEventsDisabled: boolean;
};

export const Text = ({ id, pointerEventsDisabled }: Props) => {
  return (
    <Input
      type="text"
      value={id}
      readOnly
      pointerEventsDisabled={pointerEventsDisabled}
    />
  );
};

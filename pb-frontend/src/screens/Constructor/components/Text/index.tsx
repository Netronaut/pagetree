import React from 'react';
import { Input, TextContainer, Configure } from './componentsStyles';
import { Modal } from '../Modal';
import { useModal } from '../../../../hooks/useModal';

type Props = {
  id: string;
  pointerEventsDisabled: boolean;
};

export const Text = ({ id, pointerEventsDisabled }: Props) => {
  const { modalRef, show } = useModal();
  return (
    <TextContainer>
      <Input
        type="text"
        value={id}
        readOnly
        pointerEventsDisabled={pointerEventsDisabled}
      />
      <Modal ref={modalRef} id={id} />
      <Configure onClick={show}>Configure</Configure>
    </TextContainer>
  );
};

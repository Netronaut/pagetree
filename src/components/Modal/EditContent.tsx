import React from 'react';
import { Modal } from './index';
import { ModalButton, ModalInput } from './componentsStyles';
import { Flex } from '../../componentsStyles';

type Props = {
  field: string;
  label: string;
  type: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onModalClose: () => void;
  inputValue: string;
}
export const EditContent: React.FC<Props> = ({
  field,
  label,
  type,
  onChange,
  onSave,
  onCancel,
  onModalClose,
  inputValue,
}) => {
  return (
    <Modal onOpenClose={onModalClose}>
      <h3>{type}</h3>
      <ModalInput
        required
        placeholder={`Enter ${label}`}
        value={inputValue}
        onChange={event => onChange(event)}
        autoFocus
      />
      <Flex mt={16} px={50}>
        <ModalButton mainStream onClick={onCancel}>Cancel</ModalButton>
        <ModalButton mainStream whiteBg onClick={() => onSave(field)}>OK</ModalButton>
      </Flex>
    </Modal>
  );
};

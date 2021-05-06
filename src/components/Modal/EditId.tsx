import React from 'react';
import { Modal } from './index';
import { ModalButton, ModalInput, Sel } from './componentsStyles';
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
export const EditId: React.FC<Props> = ({
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
      <h3>{type} ID</h3>
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
      <hr />
      <h3>Select</h3>
      <Flex px={0} justifyContent='space-between'>
        <Sel>Sel.1</Sel>
        <Sel>Sel.2</Sel>
        <Sel>Sel.3</Sel>
        <Sel>Sel.4</Sel>
      </Flex>
    </Modal>
  );
};

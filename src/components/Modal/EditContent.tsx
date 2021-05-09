import React from 'react';
import { ModalButton, ModalInput } from './componentsStyles';
import { Flex } from '../../componentsStyles';

type Props = {
  field: string;
  label: string;
  type: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSave: (e: React.MouseEvent, field: string) => void;
  onCancel: (e: React.MouseEvent) => void;
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
  inputValue,
}) => {
  return (
    <>
      <h3>{type}</h3>
      <ModalInput
        required
        placeholder={`Enter ${label}`}
        value={inputValue}
        onChange={onChange}
        autoFocus
      />
      <Flex mt={16} px={50}>
        <ModalButton mainStream onClick={onCancel}>Cancel</ModalButton>
        <ModalButton mainStream whiteBg onClick={(e) => onSave(e, field)}>OK</ModalButton>
      </Flex>
    </>
  );
};

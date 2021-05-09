import React from 'react';
import { Modal } from './index';
import { ModalButton, ModalInput, Sel, ModalH3, Hr } from './componentsStyles';
import { Flex } from '../../componentsStyles';

type Props = {
  field: string;
  label: string;
  type: string;
  onChangeId: (e: React.FormEvent<HTMLInputElement>) => void;
  onSaveId: (field: string, testIdByUser: string) => void;
  onCancel: () => void;
  idByUser: string;
}
export const EditId: React.FC<Props> = ({
  field,
  label,
  type,
  onChangeId,
  onSaveId,
  onCancel,
  idByUser,
}) => {
  return (
    <>
      <ModalH3>{type} ID</ModalH3>
      <ModalInput
        required
        placeholder={`Enter ${label} ID`}
        value={idByUser}
        onChange={event => onChangeId(event)}
        autoFocus
      />
      <Flex mt={16} px={50}>
        <ModalButton mainStream onClick={onCancel}>Cancel</ModalButton>
        <ModalButton mainStream whiteBg onClick={() => onSaveId(field, idByUser)}>OK</ModalButton>
      </Flex>
      <Hr />
      <ModalH3>Select</ModalH3>
      <Flex px={0} justifyContent='space-between'>
        <Sel>Sel.1</Sel>
        <Sel>Sel.2</Sel>
        <Sel>Sel.3</Sel>
        <Sel>Sel.4</Sel>
      </Flex>
      <Flex mt={16} px={50}>
        <ModalButton mainStream onClick={onCancel}>Cancel</ModalButton>
        <ModalButton mainStream whiteBg>OK</ModalButton>
      </Flex>
    </>
  );
};

import React from 'react';
import { ModalButton } from './ModalButton';
import { Flex } from '../components.styles';
import { ModalH3, ModalInput } from './Modal.styles';

type Props = {
  field: string;
  label: string;
  type: string;
  onChangeId: (e: React.FormEvent<HTMLInputElement>) => void;
  onSaveId: (field: string, testIdByUser: string) => void;
  onCancel: () => void;
  idByUser: string;
};
export const EditId: React.FC<Props> = ({
  field,
  label,
  type,
  onChangeId,
  onSaveId,
  onCancel,
  idByUser,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onSaveId(field, idByUser);
  };

  return (
    <>
      <ModalH3>{type} ID</ModalH3>
      <ModalInput
        required
        placeholder={`Enter ${label} ID`}
        value={idByUser}
        onChange={onChangeId}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <Flex mt={16} px={50}>
        <ModalButton mainStream onClick={onCancel}>
          Cancel
        </ModalButton>
        <ModalButton mainStream whiteBg onClick={() => onSaveId(field, idByUser)}>
          OK
        </ModalButton>
      </Flex>
    </>
  );
};
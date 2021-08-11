import React, { useState } from 'react';
import { DeleteIcon, StarIcon, EditIcon } from '../icons';
import { Larger, HiddenCell, IconWrapperButton } from './PageList.styles';

interface Props {
  isPined?: boolean;
  title: string;
  version: string;
  onModalShow: () => void;
}

export const PageItem: React.FC<Props> = ({ isPined, title, version, onModalShow }) => {
  const [pined, setPined] = useState(isPined);
  return (
    <tr>
      <td>
        <IconWrapperButton onClick={() => setPined(!pined)}>
          <StarIcon isFilled={pined} />
        </IconWrapperButton>
      </td>
      <td>
        <Larger>{title}</Larger>
      </td>
      <HiddenCell hidden={false}>
        <IconWrapperButton onClick={onModalShow}>
          <EditIcon />
        </IconWrapperButton>
      </HiddenCell>
      <HiddenCell hidden={false}>
        <DeleteIcon />
      </HiddenCell>
      <td>{version}</td>
    </tr>
  );
};

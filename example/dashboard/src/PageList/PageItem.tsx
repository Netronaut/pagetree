import React, { useState } from 'react';
import { DeleteIcon, StarIcon, EditIcon } from '../icons';
import { Larger, HiddenCell, IconWrapperButton } from './PageList.styles';

interface Props {
  isPined?: boolean;
  title: string;
  version: string;
}

export const PageItem: React.FC<Props> = ({ isPined, title, version }) => {
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
        <EditIcon />
      </HiddenCell>
      <HiddenCell hidden={false}>
        <DeleteIcon />
      </HiddenCell>
      <td>{version}</td>
    </tr>
  );
};

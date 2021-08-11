import React from 'react';
import { DeleteIcon, StarIcon, EditIcon } from '../icons';
import { Larger, HiddenCell } from './PageList.styles';

interface Props {
  isPined?: boolean;
  title: string;
  version: string;
}

export const PageItem: React.FC<Props> = ({ isPined, title, version }) => (
  <tr>
    <td>
      <StarIcon isFilled={isPined} />
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

import React from 'react';
import { DeleteIcon } from './DeleteIcon';
import { StarIcon } from './StarIcon';
import { EditIcon } from './EditIcon';
import styled from 'styled-components';

interface Props {
  isPined?: boolean;
  title: string;
  version: string;
}

export const PageItem: React.FC<Props> = ({ isPined, title, version }) => (
  <tr>
    <td>
      <StarIcon isSelected={isPined} />
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

export const Larger = styled.span`
  font-size: 18px;
  line-height: 21px;
`;

export const HiddenCell = styled.td<{ hidden: boolean }>`
  opacity: ${({ hidden }) => (hidden ? '0.1' : '1')};
`;

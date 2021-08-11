import React, { useState } from 'react';
import { PageEntity } from '../../../strapi/src/types';
import { DeleteIcon, StarIcon, EditIcon } from '../icons';
import { Larger, HiddenCell, IconWrapperButton } from './PageList.styles';

interface Props {
  page: PageEntity;
  onRemove: (page: PageEntity) => void;
  onEdit: (page: PageEntity) => void;
}

export const PageItem: React.FC<Props> = ({ page, onEdit, onRemove }) => {
  const { isPined, title, version } = page;
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
        <IconWrapperButton onClick={() => onEdit(page)}>
          <EditIcon isOutlined />
        </IconWrapperButton>
      </HiddenCell>
      <HiddenCell hidden={false}>
        <IconWrapperButton onClick={() => onRemove(page)}>
          <DeleteIcon />
        </IconWrapperButton>
      </HiddenCell>
      <td>{version}</td>
    </tr>
  );
};

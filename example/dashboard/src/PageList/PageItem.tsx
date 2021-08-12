import React, { useState } from 'react';
import { PageEntity } from '../../../strapi/src/types';
import { DeleteIcon, StarIcon, EditIcon } from '../icons';
import { Larger, HiddenCell, IconWrapperButton } from './PageList.styles';
import { Tooltip } from './Tooltip';

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
        <Tooltip content={<>Pin page</>}>
          <IconWrapperButton onClick={() => setPined(!pined)}>
            <StarIcon isFilled={pined} />
          </IconWrapperButton>
        </Tooltip>
      </td>
      <td>
        <Larger>{title}</Larger>
      </td>
      <HiddenCell hidden={false}>
        <Tooltip content={<span>Edit page</span>}>
          <IconWrapperButton onClick={() => onEdit(page)}>
            <EditIcon isOutlined />
          </IconWrapperButton>
        </Tooltip>
      </HiddenCell>
      <HiddenCell hidden={false}>
        <Tooltip content={<span>Remove page</span>}>
          <IconWrapperButton onClick={() => onRemove(page)}>
            <DeleteIcon />
          </IconWrapperButton>
        </Tooltip>
      </HiddenCell>
      <td>{version}</td>
    </tr>
  );
};

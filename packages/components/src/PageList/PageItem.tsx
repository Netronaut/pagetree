import React, { ReactElement, useState } from 'react';
import { PageEntity } from '@pagetree/example-strapi/src/types';
import { DeleteIcon, StarIcon, EditIcon, IconButton } from '../icons';
import { Tooltip } from '../Tooltip';
import { Larger, Smaller } from '../Typography';
import { QuickActionGrid } from './PageList.styles';

interface PageItemProps {
  page: PageEntity;
  onEdit: (page: PageEntity) => void;
  onRemove: (page: PageEntity) => void;
  onSelect: (page: PageEntity) => void;
}

export const PageItem = ({ page, onSelect, onEdit, onRemove }: PageItemProps): ReactElement => {
  const { title, version } = page;
  const [quickActionsVisible, setQuickActionsVisible] = useState(false);
  return (
    <tr
      onMouseOver={() => setQuickActionsVisible(true)}
      onMouseOut={() => setQuickActionsVisible(false)}
      onClick={() => onSelect(page)}
    >
      <td>
        <Tooltip content="Pin page">
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onEdit({ ...page, starred: !page.starred });
            }}
          >
            <StarIcon fill={page.starred} />
          </IconButton>
        </Tooltip>
      </td>
      <td>
        <Larger>{title}</Larger>
      </td>
      <td>
        <QuickActionGrid
          visible={quickActionsVisible}
          onMouseOver={() => setQuickActionsVisible(true)}
        >
          <Tooltip content={<span>Edit page</span>}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onEdit(page);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content={<span>Remove page</span>}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onRemove(page);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </QuickActionGrid>
      </td>
      <td>
        <Smaller>{version}</Smaller>
      </td>
    </tr>
  );
};

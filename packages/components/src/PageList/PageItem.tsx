import React, { ReactElement } from 'react';
import { DeleteIcon, StarIcon, EditIcon, IconButton } from '../icons';
import { Tooltip } from '../Tooltip';
import { Larger, Smaller } from '../Typography';
import { QuickActionGrid } from './PageList.styles';
import { PageEntity } from './PageList.types';

interface PageItemProps {
  page: PageEntity;
  onEdit?: (page: PageEntity) => void;
  onUpdate?: (page: PageEntity) => void;
  onRemove?: (page: PageEntity) => void;
  onSelect?: (page: PageEntity) => void;
}

export const PageItem = ({
  page,
  onSelect = () => undefined,
  onEdit = () => undefined,
  onUpdate = () => undefined,
  onRemove = () => undefined,
}: PageItemProps): ReactElement => {
  const { title, version } = page;
  return (
    <tr onClick={() => onSelect(page)}>
      <td>
        <Tooltip content="Pin page">
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onUpdate({ ...page, starred: !page.starred });
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
        <QuickActionGrid>
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

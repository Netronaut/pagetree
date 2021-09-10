import React, { ReactElement, useState } from 'react';
import { Button } from '../Button';
import { IconButton, SearchIcon, StarIcon } from '../icons';
import { Input } from '../Input';
import { Tooltip } from '../Tooltip';
import { Larger } from '../Typography';
import { PageItem } from './PageItem';
import { PageListHeader } from './PageListHeader';
import { ListHead, Table } from './PageList.styles';
import { PageEntity } from './PageList.types';

export interface PageListProps {
  children: ReactElement;
  primary?: boolean;
  pages: PageEntity[];
  onAdd: () => void;
  onEdit: (page: PageEntity) => void;
  onUpdate: (page: PageEntity) => void;
  onRemove: (page: PageEntity) => void;
  onSelect: (page: PageEntity) => void;
}

export const PageList = ({
  pages,
  onAdd,
  onEdit,
  onUpdate,
  onRemove,
  onSelect,
}: PageListProps): ReactElement => {
  const [filterStarred, setFilterStarred] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <ListHead>
        <Larger as="h2" flex>
          <span style={{ marginRight: '.5em' }}>All Pages</span>
          <Tooltip content="Show starred pages only">
            <IconButton onClick={() => setFilterStarred(!filterStarred)}>
              <StarIcon fill={filterStarred} />
            </IconButton>
          </Tooltip>
        </Larger>
        <Input
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          icon={<SearchIcon />}
        />
        <Button primary onClick={onAdd}>
          Add page
        </Button>
      </ListHead>
      <Table>
        <thead>
          <PageListHeader />
        </thead>
        <tbody>
          {pages.length
            ? pages
                .filter(
                  ({ title }) =>
                    searchValue === '' ||
                    title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
                )
                .filter(({ starred }) => !filterStarred || (filterStarred && starred))
                .map((page) => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                  />
                ))
            : null}
        </tbody>
      </Table>
    </>
  );
};

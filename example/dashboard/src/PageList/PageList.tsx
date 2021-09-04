import React, { ReactElement, useState } from 'react';
import { PageEntity } from '../../../strapi/src/types';
import { Button } from '../Button';
import { IconButton, SearchIcon, StarIcon } from '../icons';
import { Larger } from '../Typography';
import { Tooltip } from '../Tooltip';
import { PageItem } from './PageItem';
import { PageListHeader } from './PageListHeader';
import { ListHead, Table } from './PageList.styles';
import { Input } from '../Input';

export interface PageListProps {
  children: ReactElement;
  primary?: boolean;
  pages: PageEntity[];
  onAdd: () => void;
  onEdit: (page: PageEntity) => void;
  onRemove: (page: PageEntity) => void;
  onSelect: (page: PageEntity) => void;
}

export const PageList = ({
  pages,
  onAdd,
  onEdit,
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
          {pages.length &&
            pages
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
                  onRemove={onRemove}
                />
              ))}
        </tbody>
      </Table>
    </>
  );
};

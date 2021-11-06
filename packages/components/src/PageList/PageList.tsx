import React, { ReactElement, useState } from 'react';
import { Button } from '../Button';
import { IconButton, SearchIconOutline, StarIconOutline } from '../icons';
import { Input } from '../Input';
import { Tooltip } from '../Tooltip';
import { LargerMedium } from '../Typography';
import { PageItem } from './PageItem';
import { PageListHeader } from './PageListHeader';
import { ListHead, ListHeadTitle, Table } from './PageList.styles';
import { PageEntity } from './PageList.types';

export interface PageListProps {
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
        <ListHeadTitle>
          <LargerMedium>All Pages</LargerMedium>
          <Tooltip content="Show starred pages only">
            <IconButton onClick={() => setFilterStarred(!filterStarred)} active={filterStarred}>
              <StarIconOutline />
            </IconButton>
          </Tooltip>
        </ListHeadTitle>
        <Input
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          icon={<SearchIconOutline />}
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

import React, { ReactElement, useState } from 'react';

import { PageEntity } from '../../../strapi/src/types';
import { useModal } from '../../../../src/hooks'; // TODO: need to import from the '@pagio/builder';

import { PageItem } from './PageItem';
import { Table } from './PageList.styles';
import { PageListHeader } from './PageListHeader';
import { InputSearch } from '../InputSearch';
import { Button } from '../Button';
import { FilterByPin } from './FilterByPin';
export interface PageListProps {
  children: ReactElement;
  primary?: boolean;
  pages: PageEntity[];
}

export const PageList = ({ pages }: PageListProps): ReactElement => {
  const { isModalShown, onModalShow, onModalClose } = useModal();
  const [isFilterByPinActive, setIsFilterByPinActive] = useState(false);
  const handleAdd = () => alert('open the Edit window');
  const handleRemove = (page: PageEntity) => alert(`page with the id:${page.id} should be remove`);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <FilterByPin
        isFilterActive={isFilterByPinActive}
        setIsFilterActive={setIsFilterByPinActive}
      />
      <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <Button onClick={handleAdd}>Add page</Button>
      {isModalShown && (
        <h2>
          Should open the Editing modal window <button onClick={onModalClose}>close editing</button>
        </h2>
      )}
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
              .filter(({ isPined }) => !isFilterByPinActive || (isFilterByPinActive && isPined))
              .map((page) => (
                <PageItem key={page.id} page={page} onEdit={onModalShow} onRemove={handleRemove} />
              ))}
        </tbody>
      </Table>
    </>
  );
};

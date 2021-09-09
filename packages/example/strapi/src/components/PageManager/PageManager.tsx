import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import { AddPageInput } from './AddPageInput';
import { getPages, removePage, savePage } from '../../api';
import { Header } from '../Header';
import { PageEntity } from '../../types';
import { PageManagerModal } from './PageManagerModal';
import { PageListItem } from './PageListItem';
import { FilterInput, PageItemButton, PageList } from './PageManager.styles';

export const PageManager = (): ReactElement => {
  const [pages, setPages] = useState<Array<PageEntity>>([]);
  const [editPage, setEditPage] = useState<PageEntity | null>(null);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    getPages().then((data) => setPages(data));
  }, []);

  const handleSave = async (page: PageEntity) => {
    const data = await savePage(page);

    if (page.id) {
      setPages(pages.map((page) => (page.id === data.id ? data : page)));
    } else {
      setPages(pages.concat(data));
    }

    setEditPage(null);
  };

  const handleRemove = async (page: PageEntity) => {
    const data = await removePage(String(page.id));
    setPages(pages.filter(({ id }) => id !== data.id));
  };

  const filteredPages = useMemo(
    () =>
      pages.filter((page: PageEntity) =>
        [page.title, page.path].find((value) => new RegExp(filterValue, 'i').test(value)),
      ),
    [pages, filterValue],
  );

  return (
    <>
      <Header />
      <PageList>
        <h3>Create a page</h3>
        <AddPageInput onSave={handleSave} />
        {pages.length > 0 && (
          <>
            <h3>Your pages</h3>
            <FilterInput>
              <input
                type="text"
                onChange={(e) => setFilterValue(e.currentTarget.value)}
                placeholder="filter by title"
                value={filterValue}
              />
              <PageItemButton disabled={filterValue == ''} onClick={() => setFilterValue('')}>
                x
              </PageItemButton>
            </FilterInput>
            {filteredPages.map((page: PageEntity) => (
              <PageListItem
                onRemove={(page) => handleRemove(page)}
                onEdit={(page) => setEditPage(page)}
                key={page.id}
                page={page}
              />
            ))}

            <p>{pages.length == 1 ? '1 page' : pages.length + ' pages'}</p>
          </>
        )}
      </PageList>

      {editPage && (
        <PageManagerModal page={editPage} onClose={() => setEditPage(null)} onSave={handleSave} />
      )}
    </>
  );
};

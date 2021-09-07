import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { AddPageInput } from './AddPageInput';
import { apiUrls } from '../../apiUrls';
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
    axios.get(apiUrls.pages).then((response) => setPages(response.data));
  }, []);

  const handleSave = async (page: PageEntity) => {
    const { id, title, path } = page;

    const method = id ? 'put' : 'post';
    const url = [apiUrls.pages];

    if (id) {
      url.push(String(id));
    }

    const response = await axios[method](url.join('/'), { title, path });

    if (id) {
      setPages(pages.map((page) => (page.id === response.data.id ? response.data : page)));
    } else {
      setPages(pages.concat(response.data));
    }

    setEditPage(null);
  };

  const handleRemove = async (page: PageEntity) => {
    const response = await axios.delete(`${apiUrls.pages}/${page.id}`);
    setPages(pages.filter(({ id }) => id !== response.data.id));
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

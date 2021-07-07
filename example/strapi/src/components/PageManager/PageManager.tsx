import React, { ReactElement, useMemo } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { PageManagerModal } from './PageManagerModal';
import { ManagementContext } from '../../context';
import { AddPageInput } from './AddPageInput';
import { apiUrls } from '../../apiUrls';
import { PageListItem } from './PageListItem';
import { PageEntity } from '../../types';
import S from './PageManager.styles';

export const PageManager = (): ReactElement => {
  const { pages, setPages } = useContext(ManagementContext);
  const [editingPageId, setEditingPageId] = useState<number | null>(null);
  const [filterValue, setFilterValue] = useState('');

  const handleSave = async ({ id, title, path }: { id?: number; title: string; path: string }) => {
    setEditingPageId(null);

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
  };

  const handleRemove = async (id: number) => {
    const response = await axios.delete(`${apiUrls.pages}/${id}`);
    setPages(pages.filter((page) => page.id !== response.data.id));
  };

  const filteredPages = useMemo(
    () =>
      pages.filter((page: TPageData) =>
        [page.title, page.path].find((value) => new RegExp(filterValue, 'i').test(value)),
      ),
    [pages, filterValue],
  );

  return (
    <>
      <S.PageList>
        <h3>Create a page</h3>
        <AddPageInput onSave={handleSave} />
        {pages.length > 0 && (
          <>
            <h3>Your pages</h3>
            <S.FilterInput>
              <input
                type="text"
                onChange={(e) => setFilterValue(e.currentTarget.value)}
                placeholder="filter by title"
                value={filterValue}
              />
              <S.PageItemButton disabled={filterValue == ''} onClick={() => setFilterValue('')}>
                x
              </S.PageItemButton>
            </S.FilterInput>
            {filteredPages.map((page: PageEntity) => (
              <PageListItem
                remove={handleRemove}
                onEdit={(id: number) => setEditingPageId(id)}
                key={page.id}
                page={page}
              />
            ))}

            <p>{pages.length == 1 ? '1 page' : pages.length + ' pages'}</p>
          </>
        )}
      </S.PageList>
      {editingPageId && (
        <PageManagerModal
          pageId={editingPageId}
          pages={pages}
          close={() => setEditingPageId(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

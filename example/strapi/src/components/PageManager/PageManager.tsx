import React, { ReactElement } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Header } from '../Header';
import { PageManagerModal } from './PageManagerModal';
import { ManagementContext } from '../../utils/context';
import { AddPageInput } from './AddPageInput';
import { apiUrls } from '../../apiUrls';
import { createUrlFromText } from '../../utils';
import { PageListItem } from './PageListItem';
import { TPageData } from '../../types';
import S from './PageManager.styles';

export const PageManager = (): ReactElement => {
  const [, setShowPreview] = useState(false);
  const { pages, setPages } = useContext(ManagementContext);
  const [editingPageId, seteditingPageId] = useState<number | undefined>(undefined);
  const createPage = (title: string, path: string) => {
    axios
      .post(apiUrls.pages, {
        title,
        path,
      })
      .then((response) => {
        const copyPages = pages.slice();
        copyPages.push(response.data);
        setPages(copyPages);
      });
  };

  const handleOpenEdit = (id: number) => seteditingPageId(id);

  const handleCloseEdit = () => {
    seteditingPageId(undefined);
  };

  const handleSaveEdit = (id: number, value: string) => {
    seteditingPageId(undefined);
    axios
      .put(`${apiUrls.pages}/${id}`, {
        title: value,
        path: createUrlFromText(value),
      })
      .then((response) => {
        const copyPages = pages.slice();
        const findedIndex = copyPages.findIndex((page) => page.id === response.data.id);
        copyPages.splice(findedIndex, 1, response.data);
        setPages(copyPages);
      });
  };

  const handleRemove = (id: number) => {
    axios.delete(`${apiUrls.pages}/${id}`).then((response) => {
      const copyPages = pages.slice();
      const findedIndex = copyPages.findIndex((page) => page.id === response.data.id);
      copyPages.splice(findedIndex, 1);
      setPages(copyPages);
    });
  };

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      <S.PageList>
        <h3>Create a page</h3>
        <AddPageInput save={createPage} />
        {(pages.length > 0 && (
          <>
            <h3>Your pages</h3>
            {pages.map((page: TPageData) => (
              <PageListItem
                remove={handleRemove}
                openEdit={handleOpenEdit}
                key={page.id}
                page={page}
              />
            ))}

            <p>{pages.length == 1 ? '1 page' : pages.length + ' pages'}</p>
          </>
        )) || <p>No pages available!</p>}
      </S.PageList>
      {editingPageId && (
        <PageManagerModal
          pageId={editingPageId}
          pages={pages}
          close={handleCloseEdit}
          save={handleSaveEdit}
        />
      )}
    </>
  );
};

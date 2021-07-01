import React, { ReactElement } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Header } from '../Header';
import { PageManagerModal } from './PageManagerModal';
import { ManagementContext } from '../../utils/context';
import { PageManagerAddPage } from './PageManagerAddPage';
import { apiUrls } from '../../apiUrls';
import { createUrlFromText } from '../../utils';
import { PageManagerRow } from './PageManagerRow';
import { TPageData } from '../../types';
import S from './PageManager.styles';

export const PageManager = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showPreview, setShowPreview] = useState(false);
  const { pages, changePages } = useContext(ManagementContext);
  const [editingPageId, seteditingPageId] = useState<number | undefined>(undefined);
  const createPage = (title: string, link: string) => {
    axios
      .post(apiUrls.pages, {
        title,
        link,
      })
      .then((response) => {
        const copyPages = pages.slice();
        copyPages.push(response.data);
        changePages(copyPages);
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
        link: createUrlFromText(value),
      })
      .then((response) => {
        const copyPages = pages.slice();
        const findedIndex = copyPages.findIndex((page) => page.id === response.data.id);
        copyPages.splice(findedIndex, 1, response.data);
        changePages(copyPages);
      });
  };

  const handleRemove = (id: number) => {
    axios.delete(`${apiUrls.pages}/${id}`).then((response) => {
      const copyPages = pages.slice();
      const findedIndex = copyPages.findIndex((page) => page.id === response.data.id);
      copyPages.splice(findedIndex, 1);
      changePages(copyPages);
    });
  };

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      <S.PageManager>
        <h3>Create a page</h3>
        <PageManagerAddPage save={createPage} />
        {(pages.length > 0 && (
          <>
            <h3>Your pages</h3>
            {pages.length > 0
              ? pages.map((page: TPageData) => (
                  <PageManagerRow
                    remove={handleRemove}
                    openEdit={handleOpenEdit}
                    key={page.id}
                    page={page}
                  />
                ))
              : null}

            <p>{pages.length == 1 ? '1 page' : pages.length + ' pages'}</p>
          </>
        )) || <p>No pages available!</p>}
      </S.PageManager>
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

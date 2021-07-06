import React, { ReactElement } from 'react';
import { Builder, TPage } from '@pagio/builder';
import { useState, useContext, useEffect } from 'react';
import { components, componentGroups } from '../../catalog';
import { Header } from '../Header';
import { ManagementContext } from '../../utils/context';
import axios from 'axios';
import { apiUrls } from '../../apiUrls';
import { TPageData } from '../../types';

export const PagebuilderPage = (): ReactElement => {
  const [showPreview, setShowPreview] = useState(false);
  const { pages, setPages } = useContext(ManagementContext);
  const [page, setPage] = useState<TPageData | undefined>({} as TPageData);
  const [pageContent, setPageContent] = useState<TPage | undefined>({} as TPage);

  console.log('currentPage');
  useEffect(() => {
    const currentPageTitle = location.pathname.split('/')[2];
    const currentPage = pages.find((page) => page.path === `/${currentPageTitle}`);
    console.log(currentPage);
    setPage(currentPage);
    currentPage?.pageContent && setPageContent(currentPage?.pageContent);
  }, [pages]);

  useEffect(() => {
    JSON.stringify(page?.pageContent) !== JSON.stringify(pageContent) &&
      page?.id &&
      axios
        .put(`${apiUrls.pages}/${page?.id}`, {
          pageContent,
        })
        .then((response) => {
          const copyPages = pages.slice();
          const findedIndex = copyPages.findIndex((page) => page.id === response.data.id);
          copyPages.splice(findedIndex, 1, response.data);
          setPages(copyPages);
        });
  }, [pageContent]);

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      {pageContent && (
        <Builder
          pageContent={pageContent}
          onChange={setPageContent}
          showPreview={showPreview}
          components={components}
          componentGroups={componentGroups}
        />
      )}
    </>
  );
};

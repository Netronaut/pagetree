import 'react-app-polyfill/ie11';
import * as React from 'react';
import { Builder } from '@pagio/builder';
import { useState, useContext, useEffect } from 'react';
import { components, componentGroups } from '../../catalog';
import { Header } from '../Header';
import { ManagementContext } from '../../utils/context';
import axios from 'axios';
import { apiUrls } from '../../apiUrls';
import { TPageData } from '../../types';

export const PagebuilderPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { pages, changePages } = useContext(ManagementContext);
  const [page, setPage] = useState({} as TPageData);
  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    const currentPageTitle = location.pathname.split('/')[2];
    const currentPage = pages.find(
      page => page.link === `/${currentPageTitle}`,
    );
    setPage(currentPage);
    currentPage?.pageContent && setPageContent(currentPage?.pageContent);
  }, [pages]);

  useEffect(() => {
    JSON.stringify(page.pageContent) !== JSON.stringify(pageContent) &&
      page?.id &&
      axios
        .put(`${apiUrls.aricles}/${page?.id}`, {
          pageContent,
        })
        .then(response => {
          const copyPages = pages.slice();
          const findedIndex = copyPages.findIndex(
            page => page.id === response.data.id,
          );
          copyPages.splice(findedIndex, 1, response.data);
          changePages(copyPages);
        });
  }, [pageContent]);

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      <Builder
        pageContent={pageContent}
        onChange={setPageContent}
        showPreview={showPreview}
        components={components}
        componentGroups={componentGroups}
      />
    </>
  );
};

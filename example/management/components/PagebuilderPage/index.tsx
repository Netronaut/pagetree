import 'react-app-polyfill/ie11';
import * as React from 'react';
import { Builder } from '@pagio/builder';
import { useState, useContext, useEffect } from 'react';
import { components, componentGroups } from '../../catalog';
import { Header } from '../Header';
import { ManagementContext } from '../../utils/context';
import axios from 'axios';
import { apiUrls } from '../../apiUrls';
import { TArticle } from '../../types';

export const PagebuilderPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { articles, changeArticles } = useContext(ManagementContext);
  const [article, setArticle] = useState({} as TArticle);
  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    const currentArticleTitle = location.pathname.split('/')[2];
    const currentArticle = articles.find(
      article => article.link === `/${currentArticleTitle}`,
    );
    setArticle(currentArticle);
    currentArticle?.pageContent && setPageContent(currentArticle?.pageContent);
  }, [articles]);

  useEffect(() => {
    JSON.stringify(article.pageContent) !== JSON.stringify(pageContent) &&
      article?.id &&
      axios
        .put(`${apiUrls.aricles}/${article?.id}`, {
          pageContent,
        })
        .then(response => {
          const copyArticles = articles.slice();
          const findedIndex = copyArticles.findIndex(
            article => article.id === response.data.id,
          );
          copyArticles.splice(findedIndex, 1, response.data);
          changeArticles(copyArticles);
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

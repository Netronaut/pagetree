import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { CreateArticleForm } from './CreateArticleForm';
import { ArticleList } from './ArticleList';
import { Modal } from './Modal';
import { Flex } from './Article';
import { apiUrls } from '../../apiUrls';
import { createUrlFromText } from '../../utils';
import { ManagementContext } from '../../utils/context';

export const ArticlePage: React.FC = () => {
  const { articles, changeArticles } = useContext(ManagementContext);

  const [editingArticleId, setEditingArticleId] = useState<number | undefined>(
    undefined,
  );

  const createArticle = (title: string, link: string) => {
    axios
      .post(apiUrls.aricles, {
        title,
        link,
      })
      .then(response => {
        const copyArticles = articles.slice();
        copyArticles.push(response.data);
        changeArticles(copyArticles);
      });
  };

  const handleOpenEdit = (id: number) => setEditingArticleId(id);

  const handleCloseEdit = () => {
    setEditingArticleId(undefined);
  };

  const handleSaveEdit = (id, value) => {
    setEditingArticleId(undefined);
    axios
      .put(`${apiUrls.aricles}/${id}`, {
        title: value,
        link: createUrlFromText(value),
      })
      .then(response => {
        const copyArticles = articles.slice();
        const findedIndex = copyArticles.findIndex(
          article => article.id === response.data.id,
        );
        copyArticles.splice(findedIndex, 1, response.data);
        changeArticles(copyArticles);
      });
  };

  const handleRemove = (id: number) => {
    axios.delete(`${apiUrls.aricles}/${id}`).then(response => {
      const copyArticles = articles.slice();
      const findedIndex = copyArticles.findIndex(
        article => article.id === response.data.id,
      );
      copyArticles.splice(findedIndex, 1);
      changeArticles(copyArticles);
    });
  };

  return (
    <>
      <Flex flexDirection="column" alignItems="center" px={15}>
        <h1>Create Article</h1>
        <CreateArticleForm save={createArticle} />
        {articles.length && (
          <ArticleList
            articles={articles}
            openEdit={handleOpenEdit}
            remove={handleRemove}
          />
        )}
      </Flex>
      {editingArticleId && (
        <Modal
          articleId={editingArticleId}
          articles={articles}
          close={handleCloseEdit}
          save={handleSaveEdit}
        />
      )}
    </>
  );
};

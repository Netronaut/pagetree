import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CreateArticleForm } from './CreateArticleForm';
import { ArticleList } from './ArticleList';
import { apiUrls } from '../../apiUrls';
import { Modal } from './Modal';
import { createUrlFromText } from '../../utils';

export const ArticlePage: React.FC = () => {
  const [editingArticleId, setEditingArticleId] = useState<number | undefined>(
    undefined,
  );
  const [articles, setArticles] = useState([]);
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(apiUrls.aricles);
      setArticles(response.data);
    } catch (error) {
      setArticles(error);
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, []);

  const createArticle = (title: string, link: string) => {
    axios
      .post(apiUrls.aricles, {
        title,
        link,
      })
      .then(response => {
        const copyArticles = articles.slice();
        copyArticles.push(response.data);
        setArticles(copyArticles);
      });
  };

  const handleOpenEdit = (id: number) => setEditingArticleId(id);

  const handleCloseEdit = () => {
    setEditingArticleId(undefined);
  };

  const handleSaveEdit = (id, value) => {
    setEditingArticleId(undefined);
    axios
      .put(apiUrls.aricles + '/' + id, {
        title: value,
        link: createUrlFromText(value),
      })
      .then(response => {
        console.log(response);
      });
  };

  return (
    <>
      <h1>Create Article</h1>
      <CreateArticleForm save={createArticle} />
      {articles.length && (
        <ArticleList articles={articles} openEdit={handleOpenEdit} />
      )}
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

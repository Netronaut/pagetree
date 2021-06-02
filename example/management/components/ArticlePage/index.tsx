import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CreateArticleForm } from './CreateArticleForm';
import { LinkList } from './LinkList';
import { apiUrls } from '../../apiUrls';
import { Modal } from './Modal';
import { createUrlFromText } from '../../utils';

export const ArticlePage: React.FC = () => {
  const [editingLinkId, setEditingLinkId] = useState<number | undefined>(
    undefined,
  );
  const [articles, setLinks] = useState([]);
  const getLinks = useCallback(async () => {
    try {
      const response = await axios.get(apiUrls.aricles);
      setLinks(response.data);
    } catch (error) {
      setLinks(error);
    }
  }, []);

  useEffect(() => {
    getLinks();
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
        setLinks(copyArticles);
      });
  };

  const handleOpenEdit = (id: number) => setEditingLinkId(id);

  const handleCloseEdit = () => {
    setEditingLinkId(undefined);
  };

  const handleSaveEdit = (id, value) => {
    setEditingLinkId(undefined);
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
        <LinkList articles={articles} openEdit={handleOpenEdit} />
      )}
      {editingLinkId && (
        <Modal
          articleId={editingLinkId}
          articles={articles}
          close={handleCloseEdit}
          save={handleSaveEdit}
        />
      )}
    </>
  );
};

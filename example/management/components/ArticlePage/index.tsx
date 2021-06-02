import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CreateArticleForm } from './CreateArticleForm';
import { LinkList } from './LinkList';
import { apiUrls } from '../../apiUrls';

type Props = {
  prop?: (val: any) => void;
};

export const ArticlePage: React.FC<Props> = ({ prop }) => {
  const [links, setLinks] = useState([]);
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
        console.log(response);
      });
  };

  return (
    <>
      <h1>Create Article</h1>
      <CreateArticleForm save={createArticle} />
      {links.length && <LinkList links={links} />}
    </>
  );
};

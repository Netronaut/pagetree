import React from 'react';
import styled from 'styled-components';
import { TArticle } from '../../types';
import { Article } from './Article';

type Props = {
  articles: TArticle[];
  check: (id: number) => void;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const ArticleList: React.FC<Props> = ({
  articles,
  remove,
  check,
  openEdit,
}) => (
  <List>
    {articles.map(article => {
      const props = { article, remove, check, openEdit };
      return <Article key={article.id} {...props} />;
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;

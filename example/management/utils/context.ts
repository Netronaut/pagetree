import { createContext } from 'react';
import { TArticle } from '../types';

type ManagementContextValue = {
  articles: TArticle[];
  changeArticles: any;
};

export const ManagementContext = createContext({} as ManagementContextValue);

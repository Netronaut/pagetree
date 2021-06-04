import { createContext } from 'react';
import { TArticle } from '../types';

export const ManagementContext = createContext({
  articles: [] as TArticle[],
});

import { TBasePage, TPage } from 'types';
import * as api from 'api/localStorage';
import { Optional } from 'types/helpers';

export const getPages = async () => {
  return api.getPages();
};

export const createPage = async (page: TBasePage) => {
  const newPage: TPage = {
    ...page,
    _id: Math.random().toString(32),
  };

  api.addPage(newPage);

  return newPage;
};

export const deletePage = async (id: string) => {
  api.deletePage(id);

  return id;
};

export const changePage = async (page: Optional<TPage>) => {
  return api.changePage(page);
};

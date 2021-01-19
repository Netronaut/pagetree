import { TBasePage, TPage } from 'src/types';
import * as api from 'src/api/localStorage';
import { Optional } from '../../../types/helpers';

export const getPages = async () => {
  return api.getPages();
};

// export const createPage = (page: TBasePage) => {
//   return api.post<TPage>('/page', page).then((res) => res.data);
// };
//
// export const deletePage = (id: string) => {
//   return api.delete<string>(`/page/${id}`).then(() => id);
// };

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

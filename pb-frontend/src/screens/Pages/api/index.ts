import { TBasePage, TPage, TPages } from 'src/types';
import { api } from 'src/api';

export const getPages = () => {
  return api.get<TPages>('/page/all').then((res) => res.data);
};

export const createPage = (page: TBasePage) => {
  return api.post<TPage>('/page', page).then((res) => res.data);
};

export const deletePage = (id: string) => {
  return api.delete<string>(`/page/${id}`).then(() => id);
};

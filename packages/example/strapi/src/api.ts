import { PageEntity } from '@pagio/components';

const API_PATH = '/api/pages';

export const headers = { 'Content-Type': 'application/json' };

export const getPages = (): Promise<Array<PageEntity>> =>
  fetch(API_PATH, { headers }).then((response) => response.json());

export const getPage = (id: string): Promise<PageEntity> =>
  fetch(`${API_PATH}/${id}`, { headers }).then((response) => response.json());

export const savePage = (page: PageEntity): Promise<PageEntity> => {
  const url = [API_PATH];

  if (page.id) {
    url.push(String(page.id));
  }

  return fetch(url.join('/'), {
    method: page.id ? 'put' : 'post',
    headers,
    body: JSON.stringify(page),
  }).then((response) => response.json());
};

export const removePage = (id: string): Promise<PageEntity> =>
  fetch(`${API_PATH}/${id}`, { method: 'delete', headers }).then((response) => response.json());

import { PageEntity } from '@pagetree/components';

const API_PATH = '/api/pages';

export const headers = { 'Content-Type': 'application/json' };

interface ApiPayload {
  id: number;
  attributes: PageEntity;
}
function toPageEntity(payload: ApiPayload): PageEntity {
  const { id, attributes } = payload;
  return { ...attributes, id };
}

export async function getPages(): Promise<Array<PageEntity>> {
  const response = await fetch(API_PATH, { headers });
  const { data } = await response.json();
  return data.map(toPageEntity);
}

export async function getPage(id: string): Promise<PageEntity> {
  const response = await fetch(`${API_PATH}/${id}`, { headers });
  const { data } = await response.json();
  return toPageEntity(data);
}

export async function savePage(page: PageEntity): Promise<PageEntity> {
  const url = [API_PATH];

  if (page.id) {
    url.push(String(page.id));
  }

  const response = await fetch(url.join('/'), {
    method: page.id ? 'put' : 'post',
    headers,
    body: JSON.stringify({ data: page }),
  });

  const { data } = await response.json();
  return toPageEntity(data);
}

export async function removePage(id: string): Promise<PageEntity> {
  const response = await fetch(`${API_PATH}/${id}`, { method: 'delete', headers });
  const { data } = await response.json();
  return toPageEntity(data);
}

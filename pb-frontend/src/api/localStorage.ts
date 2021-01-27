import { TPage, TPages } from '../types';
import { Optional } from '../types/helpers';

type lsFieldNames = 'pages';

const setRaw = (key: lsFieldNames, value: string) =>
  localStorage.setItem(key, value);
const getRaw = (key: lsFieldNames) => localStorage.getItem(key);

const set = (key: lsFieldNames, value: TPages | TPage) =>
  setRaw(key, JSON.stringify(value));

const get = (key: lsFieldNames) => {
  const val = getRaw(key);
  if (val) {
    return JSON.parse(val);
  }
  return null;
};

export const getPages = (): TPages => {
  try {
    return get('pages') || [];
  } catch (e) {
    return [];
  }
};

export const addPage = (page: TPage) => {
  const pages = getPages();
  pages.push(page);
  set('pages', pages);
};

export const deletePage = (id: string) => {
  let pages = getPages();
  pages = pages.filter(({ _id: i }) => id !== i);
  set('pages', pages);
};

export const changePage = ({ _id, structure, config }: Optional<TPage>) => {
  let page;
  const pages = getPages();
  const newPages = pages.map((p) => {
    if (_id === p._id) {
      const newPage = {
        ...p,
        structure,
        config,
      };
      page = newPage;
      return newPage;
    }
    return p;
  });
  set('pages', newPages);
  return (page as unknown) as TPage;
};

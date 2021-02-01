import { useMemo } from 'react';
import { useDispatchActions, useTypedSelector } from 'hooks';
import { actions } from '../redux';

const usePages = (id?: string) => {
  const pages = useTypedSelector((state) => state.pages);

  const getPages = useDispatchActions(actions.getPages.request);
  const deletePage = useDispatchActions(actions.deletePage.request);
  const changePage = useDispatchActions(actions.changePage.request);

  const page = useMemo(() => pages.find(({ _id: i }) => id === i), [pages, id]);

  return { pages, page, getPages, deletePage, changePage };
};

export default usePages;

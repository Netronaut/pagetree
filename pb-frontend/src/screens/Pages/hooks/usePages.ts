import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useMemo } from 'react';
import useDispatchActions from '../../../hooks/useDispatchActions';
import { actions } from '../redux';

const usePages = (id?: string) => {
  const pages = useTypedSelector((state) => state.pages);

  const getPages = useDispatchActions(actions.getPages.request);
  const deletePage = useDispatchActions(actions.deletePage.request);

  const page = useMemo(() => pages.find(({ _id: i }) => id === i), [pages, id]);

  return { pages, page, getPages, deletePage };
};

export default usePages;

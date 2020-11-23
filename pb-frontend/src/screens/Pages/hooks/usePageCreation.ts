import { actions } from '../redux';
import useDispatchActions from 'src/hooks/useDispatchActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useCallback } from 'react';

const usePageCreation = () => {
  const pages = useTypedSelector((state) => state.pages);

  const pathExists = useCallback(
    (route: string) => {
      return pages.some(({ route: r }) => r === route);
    },
    [pages],
  );

  const createPage = useDispatchActions(actions.createPage.request);

  return { createPage, pathExists };
};

export default usePageCreation;

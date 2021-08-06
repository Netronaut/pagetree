import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import md5 from 'md5';
import { PageTreeAction, reducer } from './reducer';
import { CatalogComponent, PageTreeState } from './types';
import { PageNode } from './pageTree';

export const PageTreeDispatchContext = createContext<Dispatch<PageTreeAction>>(() => undefined);
export const PageTreeStateContext = createContext<PageTreeState>({});

interface PageTreeProviderProps {
  children: ReactNode;
  onUpdate?: (update: PageNode) => void;
  pageTree?: PageNode;
  preview?: boolean;
  components?: Array<CatalogComponent>;
}

export const PageTreeProvider = ({
  children,
  onUpdate,
  preview = false,
  components,
  pageTree,
}: PageTreeProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, {
    pageTree,
    preview,
    components,
  });

  useEffect(() => {
    onUpdate && state.pageTree && onUpdate(state.pageTree);
  }, [onUpdate, pageTree ? md5(pageTree.toString()) : undefined]);

  return (
    <PageTreeDispatchContext.Provider value={dispatch}>
      <PageTreeStateContext.Provider value={state}>{children}</PageTreeStateContext.Provider>
    </PageTreeDispatchContext.Provider>
  );
};

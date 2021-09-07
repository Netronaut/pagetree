import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { PageTreeAction, reducer } from './reducer';
import { PageTreeState } from './types';
import { PageNode } from './pageTree';
import { CatalogComponentDescription } from './components/Catalog';

export const PageTreeDispatchContext = createContext<Dispatch<PageTreeAction>>(() => undefined);
export const PageTreeStateContext = createContext<PageTreeState>({});

interface PageTreeProviderProps {
  children: ReactNode;
  onUpdate?: (update: PageNode) => void;
  pageTree?: PageNode;
  preview?: boolean;
  components?: Array<CatalogComponentDescription>;
}

export const PageTreeProvider = ({
  children,
  onUpdate = () => undefined,
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
    state.pageTree?.hash && onUpdate(state.pageTree as PageNode);
  }, [state.pageTree?.hash]);

  return (
    <PageTreeDispatchContext.Provider value={dispatch}>
      <PageTreeStateContext.Provider value={state}>{children}</PageTreeStateContext.Provider>
    </PageTreeDispatchContext.Provider>
  );
};

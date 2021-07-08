import { createContext } from 'react';
import { PageEntity } from './types';

type ManagementContextValue = {
  pages: PageEntity[];
  setPages: (pageData: PageEntity[]) => void;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  setPages: () => undefined,
});

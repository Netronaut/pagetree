import { createContext } from 'react';
import { TPageData } from '../types';

type ManagementContextValue = {
  pages: TPageData[];
  setPages: (pageData: TPageData[]) => void;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  setPages: () => undefined,
});

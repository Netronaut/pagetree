import { createContext } from 'react';
import { TPageData } from '../types';

type ManagementContextValue = {
  pages: TPageData[];
  changePages: (pageData: TPageData[]) => void;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  changePages: () => undefined,
});

import { createContext } from 'react';
import { TPageData } from '../types';

type ManagementContextValue = {
  pages: TPageData[];
  changePages: any;
};

export const ManagementContext = createContext({} as ManagementContextValue);

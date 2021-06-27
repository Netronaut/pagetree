import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { createContext } from 'react';
import { TPageData } from '../types';

type ManagementContextValue = {
  pages: TPageData[];
  changePages: Dispatch<SetStateAction<never[]>>;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  changePages: () => undefined,
});

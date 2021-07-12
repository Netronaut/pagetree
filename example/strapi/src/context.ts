import { createContext } from 'react';
import { PageEntity } from './types';
// import diff from 'changeset';

type ManagementContextValue = {
  pages: PageEntity[];
  setPages: (pageData: PageEntity[]) => void;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  setPages: () => undefined,
});

type HistoryLogContextValue = {
  historyLog: any[];
  setHistoryLog: (historyLog: PageEntity[]) => undefined;
};

export const HistoryLogContext = createContext<HistoryLogContextValue>({
  historyLog: [],
  setHistoryLog: () => undefined,
});

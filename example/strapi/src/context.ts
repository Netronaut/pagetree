import { createContext, Dispatch, SetStateAction } from 'react';
import { PageEntity, HistoryLogItem } from './types';

type ManagementContextValue = {
  pages: PageEntity[];
  setPages: (pageData: PageEntity[]) => void;
};

export const ManagementContext = createContext<ManagementContextValue>({
  pages: [],
  setPages: () => undefined,
});

type HistoryLogContextValue = {
  historyLog: HistoryLogItem[];
  setHistoryLog: Dispatch<SetStateAction<HistoryLogItem[]>>;
};

export const HistoryLogContext = createContext<HistoryLogContextValue>({
  historyLog: [],
  setHistoryLog: () => undefined,
});

import { PageStructure } from '@pagio/builder/dist/types';
import { ProductionComponentProps } from '@pagio/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageStructure;
}

export type HistoryLogItem = {
  date: string;
  change: Change[];
};

export type Change = {
  type: string;
  key: string[];
  value: string | ProductionComponentProps;
};

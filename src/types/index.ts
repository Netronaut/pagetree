import { ChildDirection } from '../utils/tree';
import { ProductionComponentProps } from '../hocs/createCatalogComponent';

export interface PageStructure {
  _id: string;
  structure?: ChildDirection;
  config?: Record<string, Record<string, string>>;
}

export type PageHistory = Array<HistoryLogItem>;

export interface HistoryLogItem {
  date: string;
  change: Array<PageHistoryItem>;
}

export interface PageHistoryItem {
  type: 'put' | 'del';
  key: Array<string>;
  value: string | ProductionComponentProps;
}

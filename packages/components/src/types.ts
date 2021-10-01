import { CatalogComponentProps, PageNodeOptions } from '@pagio/builder';

export type PageHistory = Array<PageHistoryItem>;

export interface PageHistoryItem {
  date: string;
  version?: string;
  changes?: Array<PageChange>;
}

export interface PageChange {
  type: 'put' | 'del';
  key: Array<string>;
  value: string | CatalogComponentProps;
}

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageNodeOptions;
  starred?: boolean;
  version?: string;
  history?: PageHistory;
}

import { PageHistory, PageNodeOptions } from '@pagio/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageNodeOptions;
  starred?: boolean;
  version?: string;
  history?: PageHistory;
}

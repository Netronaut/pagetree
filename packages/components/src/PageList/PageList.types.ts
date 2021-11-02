import { PageHistory, PageNodeOptions } from '@pagetree/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageNodeOptions;
  starred?: boolean;
  version?: string;
  history?: PageHistory;
}

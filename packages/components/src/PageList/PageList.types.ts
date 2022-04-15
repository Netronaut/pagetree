import { PageHistory, PageNode } from '@pagetree/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageNode;
  starred?: boolean;
  version?: string;
  history?: PageHistory;
}

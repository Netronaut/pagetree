import { SerializedPageNode } from '@pagetree/builder';
import { Diff } from 'changeset';

export type PageHistory = Array<PageHistoryItem>;

export interface PageHistoryItem {
  date: string;
  change: Array<Diff>;
}

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: SerializedPageNode;
  starred?: boolean;
  version?: string;
  history?: PageHistory;
}

import { PageContent, PageHistory } from '@pagio/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  isPined?: boolean;
  version?: string;
  pageContent?: PageContent;
  history?: PageHistory;
}

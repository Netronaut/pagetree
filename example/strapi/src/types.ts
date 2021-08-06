import { PageContent, PageHistory } from '@pagio/builder';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageContent;
  history?: PageHistory;
}

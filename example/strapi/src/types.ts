import { PageStructure } from '@pagio/builder/dist/types';

export interface PageEntity {
  id?: number;
  title: string;
  path: string;
  pageContent?: PageStructure;
}

import { ChildDirection } from './utils/tree';
import { ProductionComponentProps } from './hocs/createCatalogComponent';

export type Optional<T> = {
  [K in keyof T]?: T[K];
};

export interface PageStructure {
  _id: string;
  structure?: ChildDirection;
  config?: Record<string, Record<string, string>>;
}

export type PageHistory = Array<PageHistoryItem>;

export interface PageHistoryItem {
  date: Date;
  change: Array<PageChange>;
}

export interface PageChange {
  type: 'put' | 'del';
  key: Array<string>;
  value: string | ProductionComponentProps;
}

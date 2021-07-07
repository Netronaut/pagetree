import { ChildDirection } from '../utils/tree';

export interface PageStructure {
  _id: string;
  structure?: ChildDirection;
  config?: Record<string, Record<string, string>>;
}

export type PageStructures = PageStructure[];

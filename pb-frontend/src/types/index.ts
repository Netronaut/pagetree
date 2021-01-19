import { ChildDirection } from '../utils/tree';

export type TBasePage = {
  title: string;
  route: string;
};

export type TPage = TBasePage & {
  _id: string;
  structure?: ChildDirection;
};

export type TPages = TPage[];

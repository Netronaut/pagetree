import { ProductionComponentProps } from './components';
import { PageNode } from './pageTree';

export enum PageNodeAxis {
  Row = 'row',
  Column = 'column',
}

export enum InsertionPoint {
  None,
  Top = 'top',
  Left = 'left',
  Bottom = 'bottom',
  Right = 'right',
}

export interface DragOverState {
  targetId?: string;
  insertionPoint: InsertionPoint;
}

export interface PageTreeState {
  pageTree?: PageNode;
  components?: Array<CatalogComponent>;
  preview?: boolean;
  dragOver?: DragOverState;
  hash?: string;
}

export interface DataTransferProps {
  componentDescription?: CatalogComponentDescription;
  sourceId?: string;
}

export interface OnDropPayload {
  event: React.DragEvent<HTMLDivElement>;
  targetId: string;
  insertionPoint: InsertionPoint;
}

export interface DropTargetProps {
  dragOver?: DragOverState;
}

export type PageHistory = Array<PageHistoryItem>;

export interface PageHistoryItem {
  date: string;
  change: Array<PageChange>;
}

export interface PageChange {
  type: 'put' | 'del';
  key: Array<string>;
  value: string | ProductionComponentProps;
}

export interface CatalogComponentDescription {
  type: string;
  label?: string;
  tags?: Array<string>;
}

export type CatalogComponent = React.FunctionComponent<CatalogComponentDescription> &
  CatalogComponentDescription;

import { CatalogComponentDescription, CatalogComponentProps } from './components';
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

export interface DragOverPayload {
  targetId?: string;
  insertionPoint: InsertionPoint;
}

export interface DragLeavePayload {
  sourceId?: string;
}

export interface DataTransferPayload {
  componentDescription?: CatalogComponentDescription;
  sourceId?: string;
}
export interface DropPayload {
  targetId: string | null;
  insertionPoint?: InsertionPoint;
}

export interface PageTreeState {
  pageTree?: PageNode;
  components?: Array<CatalogComponentDescription>;
  preview?: boolean;
  dataTransfer?: DataTransferPayload;
  dragOver?: DragOverPayload;
  dragOverMillies?: number;
}

export interface OnDropPayload {
  event: React.DragEvent<HTMLDivElement>;
  targetId: string;
  insertionPoint: InsertionPoint;
}

export interface DropTargetProps {
  dragOver?: DragOverPayload;
}

export type PageHistory = Array<PageHistoryItem>;

export interface PageHistoryItem {
  date: string;
  change: Array<PageChange>;
}

export interface PageChange {
  type: 'put' | 'del';
  key: Array<string>;
  value: string | CatalogComponentProps;
}

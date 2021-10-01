import { FunctionComponent } from 'react';
import { PageNode } from './pageTree';

export type CatalogComponentProps = {
  type: string;
  label?: string;
  tags?: Array<string>;
  config?: Record<string, string>; // TODO remove
};

export type CatalogComponentDescription = CatalogComponentProps & {
  component?: FunctionComponent<CatalogComponentProps>;
  builderComponent?: FunctionComponent<CatalogComponentProps>;
};

export interface logItem {
  id: number;
  title: string;
  publishedDate: string;
  details: {
    id: number;
    data: string;
    changes: number;
  }[];
}

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

import { PageNode } from './pageTree';
import {
  DataTransferPayload,
  DragLeavePayload,
  DragOverPayload,
  DropPayload,
  InsertionPoint,
  PageTreeState,
} from './types';

export type PageTreeAction =
  | {
      type: 'drop';
      payload: DropPayload;
    }
  | {
      type: 'remove';
    }
  | {
      type: 'update';
      payload: { id: string; field: string; value: string; userControlledId?: string };
    }
  | {
      type: 'preview';
      payload: boolean;
    }
  | {
      type: 'dataTransfer';
      payload?: DataTransferPayload;
    }
  | {
      type: 'dragOver';
      payload?: DragOverPayload;
    }
  | {
      type: 'dragLeave';
      payload?: DragLeavePayload;
    }
  | {
      type: 'dragEnd';
    };

export function reducer(state: PageTreeState, action: PageTreeAction): PageTreeState {
  switch (action.type) {
    case 'drop': {
      const { payload } = action;
      const pageTree = state.pageTree || new PageNode({ childNodes: [] });
      const dataTransfer = state.dataTransfer;
      const targetId = payload.targetId === 'page-tree-root' ? pageTree.uuid : payload.targetId;

      const insertionPoint =
        payload.targetId !== 'page-tree-root' && payload.insertionPoint
          ? payload.insertionPoint
          : InsertionPoint.None;

      const targetNode = pageTree.findByUuid(targetId as string);
      if (!targetNode) {
        throw Error('targetNode not found');
      }

      if (dataTransfer && dataTransfer.sourceId) {
        const sourceNode = pageTree.findByUuid(dataTransfer.sourceId);
        if (!sourceNode) {
          throw Error('sourceNode not found');
        }
        if (targetNode === sourceNode) {
          return state;
        }
        pageTree.insertAt(sourceNode, insertionPoint, targetNode);
      } else if (dataTransfer && dataTransfer.componentDescription?.type) {
        pageTree.insertAt(
          new PageNode({ type: dataTransfer.componentDescription?.type as string }),
          insertionPoint,
          targetNode,
        );
      }
      pageTree.optimize();

      return {
        ...state,
        dataTransfer: undefined,
        pageTree,
      };
    }

    case 'remove': {
      const { dataTransfer } = state;

      if (dataTransfer?.sourceId) {
        const { pageTree } = state;
        const sourceNode = pageTree?.findByUuid(dataTransfer.sourceId);
        if (!sourceNode) {
          throw Error('sourceNode not found');
        }
        sourceNode.parentNode?.remove(sourceNode);
        pageTree?.optimize();
        return {
          ...state,
          dataTransfer: undefined,
          pageTree,
        };
      }

      return state;
    }

    case 'update':
      return state;

    case 'preview':
      return { ...state, preview: action.payload };

    case 'dataTransfer':
      return { ...state, dataTransfer: action.payload };

    case 'dragOver': {
      return { ...state, dragOver: action.payload, dragOverMillies: Date.now() };
    }

    case 'dragLeave': {
      if (
        state.dragOver &&
        state.dragOver.targetId === action.payload?.sourceId &&
        state.dragOverMillies &&
        state.dragOverMillies < Date.now() - 60
      ) {
        return { ...state, dragOverMillies: undefined, dragOver: undefined };
      }
      return state;
    }

    case 'dragEnd': {
      return { ...state, dataTransfer: undefined, dragOverMillies: undefined, dragOver: undefined };
    }
  }
}

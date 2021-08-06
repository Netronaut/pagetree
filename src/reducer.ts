import { PageNode } from './pageTree';
import { DragOverState, InsertionPoint, PageTreeDropPayload, PageTreeState } from './types';

export type PageTreeAction =
  | {
      type: 'drop';
      payload: PageTreeDropPayload;
    }
  | {
      type: 'remove';
      payload: { event: React.DragEvent<HTMLDivElement> };
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
      type: 'dragOver';
      payload?: DragOverState;
    };

export function reducer(state: PageTreeState, action: PageTreeAction): PageTreeState {
  switch (action.type) {
    case 'drop': {
      const { payload } = action;
      const pageTree = state.pageTree || new PageNode({ childNodes: [] });
      const { componentDescription, sourceId } = payload.data;
      const insertionPoint = payload.insertionPoint || InsertionPoint.Bottom;
      const targetId = payload.targetId === 'page-tree-root' ? pageTree.uuid : payload.targetId;

      const targetNode = pageTree.findByUuid(targetId as string);
      if (!targetNode) {
        throw Error('targetNode not found');
      }

      if (sourceId) {
        const sourceNode = pageTree.findByUuid(sourceId);
        if (!sourceNode) {
          throw Error('sourceNode not found');
        }
        if (targetNode === sourceNode) {
          return state;
        }
        pageTree.insertAt(sourceNode, insertionPoint, targetNode);
      } else if (componentDescription?.type) {
        pageTree.insertAt(
          new PageNode({ type: componentDescription?.type as string }),
          insertionPoint,
          targetNode,
        );
      }
      pageTree.clean();

      return {
        ...state,
        pageTree,
      };
    }
    case 'remove':
      return state;
    case 'update':
      return state;
    case 'preview':
      return { ...state, preview: action.payload };
    case 'dragOver':
      return { ...state, dragOver: action.payload };
  }
}

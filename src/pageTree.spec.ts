import { reducer } from './reducer';
import { InsertionPoint, PageNodeAxis } from './types';
import { PageNode, PageNodeType } from './pageTree';

describe('pageTree', () => {
  describe('reducer', () => {
    it('should add a node to an empty tree', () => {
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: undefined,
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId: 'page-tree-root',
          insertionPoint: InsertionPoint.None,
        },
      });
      expect(state.pageTree).toBeDefined();
      expect(state.pageTree?.type).toBe(PageNodeType.Track);
      expect(state.pageTree?.childNodes).toHaveLength(1);
      expect(state.pageTree?.getChildAt(0)?.type).toBe('article-teaser');
    });

    it('should add a node to an existing node list', () => {
      const targetId = 'targetId';
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: new PageNode({
          uuid: targetId,
          childNodes: [{ type: 'headline' }],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Bottom,
        },
      });

      expect(state.pageTree?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(1)?.type).toBe('article-teaser');
    });

    it('should add a node after an existing node', () => {
      const targetId = 'targetId';
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: new PageNode({
          childNodes: [{ type: 'headline', uuid: targetId }],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Bottom,
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(0)?.type).toBe('headline');
      expect(state.pageTree?.getChildAt(1)?.type).toBe('article-teaser');
    });

    it('should add a node before an existing node', () => {
      const targetId = 'targetId';
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: new PageNode({
          childNodes: [{ type: 'headline', uuid: targetId }],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Top,
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(0)?.type).toBe('article-teaser');
    });

    it('should add a node between two existing nodes', () => {
      const targetId = 'targetId';
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: new PageNode({
          childNodes: [{ type: 'headline-1', uuid: targetId }, { type: 'headline-2' }],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Bottom,
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(3);
      expect(state.pageTree?.getChildAt(0)?.type).toBe('headline-1');
      expect(state.pageTree?.getChildAt(1)?.type).toBe('article-teaser');
      expect(state.pageTree?.getChildAt(2)?.type).toBe('headline-2');
    });

    it('should add a node next to a node with non-matching axis', () => {
      const targetId = 'targetId';
      const initialState = {
        dataTransfer: { componentDescription: { type: 'article-teaser' } },
        pageTree: new PageNode({
          axis: PageNodeAxis.Column,
          childNodes: [
            { type: 'headline', uuid: 'headlineId' },
            { type: 'article-teaser', uuid: targetId },
          ],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Right,
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(1)?.type).toBe(PageNodeType.Track);
      expect(state.pageTree?.getChildAt(1)?.axis).toBe(PageNodeAxis.Row);
      expect(state.pageTree?.getChildAt(1)?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(1)?.getChildAt(0)?.uuid).toBe(targetId);
      expect(state.pageTree?.getChildAt(1)?.getChildAt(1)?.type).toBe('article-teaser');
    });

    it('should move a node', () => {
      const targetId = 'targetId';
      const sourceId = 'sourceId';
      const initialState = {
        dataTransfer: { sourceId },
        pageTree: new PageNode({
          axis: PageNodeAxis.Column,
          childNodes: [
            { type: 'headline', uuid: targetId },
            { type: 'article-teaser', uuid: sourceId },
          ],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId,
          insertionPoint: InsertionPoint.Top,
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(2);
      expect(state.pageTree?.getChildAt(0)?.uuid).toBe(sourceId);
      expect(state.pageTree?.getChildAt(1)?.uuid).toBe(targetId);
    });

    it('should clean up empty track nodes after moving a node', () => {
      const sourceId = 'sourceId';
      const initialState = {
        dataTransfer: { sourceId },
        pageTree: new PageNode({
          childNodes: [
            { type: 'headline' },
            {
              childNodes: [
                { type: 'article-teaser' },
                {
                  type: 'article-teaser',
                  uuid: sourceId,
                },
              ],
            },
          ],
        }),
      };
      const state = reducer(initialState, {
        type: 'drop',
        payload: {
          targetId: 'page-tree-root',
        },
      });
      expect(state.pageTree?.childNodes).toHaveLength(3);
      expect(state.pageTree?.getChildAt(0)?.type).toBe('headline');
      expect(state.pageTree?.getChildAt(1)?.type).toBe('article-teaser');
      expect(state.pageTree?.getChildAt(2)?.type).toBe('article-teaser');
      expect(state.pageTree?.getChildAt(2)?.uuid).toBe(sourceId);
    });

    it('should remove a node', () => {
      const sourceId = 'sourceId';
      const initialState = {
        dataTransfer: { sourceId },
        pageTree: new PageNode({
          axis: PageNodeAxis.Column,
          childNodes: [{ type: 'headline' }, { type: 'article-teaser', uuid: sourceId }],
        }),
      };
      const state = reducer(initialState, { type: 'remove' });
      expect(state.pageTree?.childNodes).toHaveLength(1);
      expect(state.pageTree?.getChildAt(0)?.uuid).not.toBe(sourceId);
    });

    it.todo(
      'should properly optimize after removing a node, leaving a track node the only child of the root node',
    );
  });

  it('should optimize empty track nodes', () => {
    const pageTree = new PageNode({
      childNodes: [{ type: 'headline' }, { childNodes: [] }],
    });
    pageTree.optimize();
    expect(pageTree.childNodes).toHaveLength(1);
  });

  it('should optimize while leaving root node unchanged', () => {
    const rootNodeId = 'rootNodeId';
    const pageTree = new PageNode({
      uuid: rootNodeId,
      type: PageNodeType.Track,
      axis: PageNodeAxis.Column,
      childNodes: [
        {
          type: PageNodeType.Track,
          axis: PageNodeAxis.Row,
          childNodes: [
            {
              type: 'article-teaser',
            },
          ],
        },
      ],
    });
    pageTree.optimize();
    expect(pageTree.uuid).toBe(rootNodeId);
    expect(pageTree.type).toBe(PageNodeType.Track);
    expect(pageTree.childNodes).toHaveLength(1);
    expect(pageTree.getChildAt(0)?.type).toBe('article-teaser');
  });

  it('should optimize merge two nested tracks of the same orientation', () => {
    const pageTree = new PageNode({
      axis: PageNodeAxis.Column,
      childNodes: [
        { type: 'headline' },
        {
          axis: PageNodeAxis.Column,
          childNodes: [{ type: 'article-teaser' }, { type: 'article-teaser' }],
        },
      ],
    });
    pageTree.optimize();
    expect(pageTree.childNodes).toHaveLength(3);
    expect(pageTree.getChildAt(0)?.type).toBe('headline');
    expect(pageTree.getChildAt(1)?.type).toBe('article-teaser');
    expect(pageTree.getChildAt(2)?.type).toBe('article-teaser');
  });
});

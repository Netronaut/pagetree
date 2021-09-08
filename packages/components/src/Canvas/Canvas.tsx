import React, { ReactElement, useContext } from 'react';
import { CanvasRoot } from './Canvas.styles';
import { RenderedNode } from './RenderedNode';
import { PageTreeStateContext, useDrop } from '@pagio/builder';

export const Canvas = (): ReactElement | null => {
  const { pageTree } = useContext(PageTreeStateContext);
  return (
    <CanvasRoot data-pagetree-root id="page-tree-root" {...useDrop()}>
      {pageTree && <RenderedNode node={pageTree} />}
    </CanvasRoot>
  );
};

import React, { ReactElement, useContext } from 'react';
import { useDrop } from '../../dragAndDrop';
import { PageTreeStateContext } from '../../provider';
import { CanvasRoot } from './Canvas.styles';
import { RenderedNode } from './RenderedNode';

export const Canvas = (): ReactElement | null => {
  const { pageTree } = useContext(PageTreeStateContext);
  return (
    <CanvasRoot data-pagetree-root id="page-tree-root" {...useDrop()}>
      {pageTree && <RenderedNode node={pageTree} />}
    </CanvasRoot>
  );
};

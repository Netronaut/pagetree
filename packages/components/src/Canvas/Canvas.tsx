import React, { ReactElement, useContext } from 'react';
import { CanvasRoot, Page } from './Canvas.styles';
import { RenderedNode } from './RenderedNode';
import { PageTreeStateContext, useDrop } from '@pagetree/core';

export const Canvas = (): ReactElement | null => {
  const { pageTree } = useContext(PageTreeStateContext);
  return (
    <CanvasRoot>
      <Page data-pagetree-root id="page-tree-root" {...useDrop()}>
        {pageTree && <RenderedNode node={pageTree} />}
      </Page>
    </CanvasRoot>
  );
};

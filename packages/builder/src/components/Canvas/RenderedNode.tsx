import React, { ReactElement, useContext, useMemo } from 'react';
import { useDrag, useDrop } from '../../dragAndDrop';
import { PageNode, PageNodeType } from '../../pageTree';
import { PageTreeStateContext } from '../../provider';
import { CatalogComponentDescription } from '../../types';
import { DefaultComponent, RenderedNodeRoot } from './Canvas.styles';

interface NodeProps {
  node: PageNode;
}

export const RenderedNode = ({ node }: NodeProps): ReactElement | null => {
  const { components } = useContext(PageTreeStateContext);

  const component = useMemo<CatalogComponentDescription | undefined>(
    () => components?.find(({ type }) => type === node.type),
    [components, node.type],
  );

  const Component = component?.builderComponent || DefaultComponent;

  return (
    <RenderedNodeRoot
      id={node.uuid}
      data-page-node-type={node.type}
      axis={node.axis}
      {...useDrag()}
      {...useDrop()}
    >
      {node.type === PageNodeType.Track
        ? node.childNodes &&
          node.childNodes.map((node) => <RenderedNode key={node.uuid} node={node} />)
        : component && (
            <Component type={component.type} label={component.label} tags={component.tags} />
          )}
    </RenderedNodeRoot>
  );
};

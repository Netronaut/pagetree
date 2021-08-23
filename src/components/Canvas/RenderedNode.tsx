import React, { ReactElement, useContext, useMemo } from 'react';
import { useDrag, useDrop } from '../../dragAndDrop';
import { PageNode, PageNodeType } from '../../pageTree';
import { PageTreeStateContext } from '../../provider';
import { RenderedNodeRoot } from './Canvas.styles';

interface NodeProps {
  node: PageNode;
}

export const RenderedNode = ({ node }: NodeProps): ReactElement | null => {
  const { components } = useContext(PageTreeStateContext);
  const Component = useMemo(
    () => components?.find(({ type }) => type === node.type),
    [components, node.type],
  );

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
        : Component && (
            <Component type={Component.type} label={Component.label} tags={Component.tags} />
          )}
    </RenderedNodeRoot>
  );
};
import React, { ReactElement, useContext, useMemo, useState } from 'react';
import {
  CatalogComponentDescription,
  PageNode,
  PageNodeType,
  PageTreeStateContext,
  useDrag,
  useDrop,
} from '@pagio/builder';
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

  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleMouseOver = () => setIsMouseOver(true);
  const handleonMouseLeave = () => setIsMouseOver(false);

  return (
    <RenderedNodeRoot
      id={node.uuid}
      data-page-node-type={node.type}
      axis={node.axis}
      {...useDrag()}
      {...useDrop()}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleonMouseLeave}
      isMouseOver={node.type !== PageNodeType.Track && isMouseOver}
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

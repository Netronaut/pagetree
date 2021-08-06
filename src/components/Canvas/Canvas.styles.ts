import styled from 'styled-components';
import { PageNodeType } from '../../pageTree';
import { DropTargetProps, InsertionPoint, PageNodeAxis } from '../../types';

const getDimensions = (position: InsertionPoint, inDirection?: boolean) => {
  const dimensions = ['10px', `calc(100% + ${!inDirection ? 2 : 0}px)`];
  let offset = InsertionPoint.Bottom;
  if ([InsertionPoint.Top, InsertionPoint.Bottom].includes(position)) {
    dimensions.reverse();
    offset = InsertionPoint.Right;
  }
  const [width, height] = dimensions;

  return {
    width,
    height,
    offset,
  };
};

export const CanvasRoot = styled.div<DropTargetProps>`
  display: flex;
  flex: 1;
  align-items: flex-start;
  background-color: lightgrey;
  margin: 1rem;
  padding: 1rem;
  border: 1px dashed grey;

  ${({ dragOver, id }) =>
    dragOver && dragOver.targetId === id
      ? `
        background-color: aquamarine;
      `
      : ''}
`;

export const Indicator = styled.div<{
  position?: InsertionPoint;
  inDirection?: boolean;
}>`
  position: absolute;
  background: lightblue;
  display: none;
  z-index: 100;
  ${({ position, inDirection }) => {
    if (position) {
      const { width, height, offset } = getDimensions(position, inDirection);

      return `
         display: flex;
         width: ${width};
         height: ${height};
         ${position.toLowerCase()}: -5.5px;
         ${offset}: ${inDirection ? 0 : -1}px;
         pointer-events: none;
          `;
    }
    return ``;
  }}
`;

export const RenderedNodeRoot = styled.div<{
  ['data-page-node-type']: string;
  axis?: PageNodeAxis;
}>`
  position: relative;

  background-color: gainsboro;
  border: 1px solid grey;
  padding: 1rem;
  min-height: 1.5rem;

  &:hover:after {
    content: '${(props) => `${props['data-page-node-type']}-${props.id}`}';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.75em;
    font-style: italic;
    padding: 0.2em;
    background-color: aquamarine;
    color: royalblue;
  }

  ${(props) =>
    props['data-page-node-type'] === PageNodeType.Track
      ? `
    display: grid;
    justify-content: normal;
    gap: 1rem;
    flex: 1;

    border: 1px dashed grey;
    grid-auto-flow: ${props.axis === PageNodeAxis.Row ? 'column' : 'row'};
  `
      : `
    
  `}
`;

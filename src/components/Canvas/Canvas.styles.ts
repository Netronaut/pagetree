import styled from 'styled-components';
import { PageNodeType } from '../../pageTree';
import { DragOverPayload, DropTargetProps, InsertionPoint, PageNodeAxis } from '../../types';

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

export const RenderedNodeRoot = styled.div<{
  ['data-page-node-type']: string;
  axis?: PageNodeAxis;
  dragOver?: DragOverPayload;
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

  ${({ dragOver, id }) =>
    dragOver && dragOver.targetId === id
      ? `
    &:before {
      content: '';
      position: absolute;
      min-width: 5px;
      min-height: 5px;
      background-color: lightblue;
      ${
        [InsertionPoint.Top, InsertionPoint.Bottom].includes(dragOver.insertionPoint)
          ? `
        left: 0;
        right: 0;
      `
          : `
        top: 0;
        bottom: 0;
      `
      }
      ${dragOver.insertionPoint}: 0;
    }
  `
      : ''}

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

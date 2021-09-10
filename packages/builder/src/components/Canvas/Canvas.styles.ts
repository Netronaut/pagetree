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
    content: '${(props) => `${props['data-page-node-type'].toUpperCase()}-${props.id}`}';
    position: absolute;
    top: calc(-1em * 2 + -9px);
    left: 0;
    padding: 1em 1.8em;
    background-color: white;
    font-family: Roboto;
    font-size: 8px;
    line-height: 9px;
    /* secondary */
    color: #5f9efc;
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

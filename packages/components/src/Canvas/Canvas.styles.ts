import styled from 'styled-components';
import {
  CatalogComponentProps,
  DragOverPayload,
  DropTargetProps,
  InsertionPoint,
  PageNodeAxis,
  PageNodeType,
} from '@pagetree/builder';
import { baseFontStyle } from '../Typography';

export const CanvasRoot = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.color.canvasBgColor};
`;

export const Page = styled.div<DropTargetProps>`
  border: 1px dashed ${({ theme }) => theme.color.gray3};
  background: ${({ theme }) => theme.color.white};
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 8rem 6rem 12rem 6rem;
  padding: ${({ theme }) => theme.spacing.xs};
  padding-bottom: 12rem;

  ${({ dragOver, id, theme }) =>
    dragOver && dragOver.targetId === id
      ? `
        background-color: ${theme.color.white};
      `
      : ''}
`;

export const RenderedNodeRoot = styled.div<{
  ['data-page-node-type']: string;
  axis?: PageNodeAxis;
  dragOver?: DragOverPayload;
}>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.gray3};
  padding: ${({ theme }) => theme.spacing.xs};
  min-height: 1.5rem;

  :hover {
    border-color: ${({ theme }) => theme.color.secondary};

    :not([data-page-node-type='${PageNodeType.Track}']):after {
      content: '${(props) => `${props['data-page-node-type'].toUpperCase()}-${props.id}`}';
      position: absolute;
      bottom: 100%;
      left: -1px;
      padding: 1em 1.8em;
      background-color: ${({ theme }) => theme.color.secondary};
      color: ${({ theme }) => theme.color.white};

      ${baseFontStyle}
      font-size: 8px;
      line-height: 9px;
    }
  }

  ${({ dragOver, id, theme }) =>
    dragOver && dragOver.targetId === id
      ? `
    &:before {
      content: '';
      position: absolute;
      min-width: 5px;
      min-height: 5px;
      background-color: ${theme.color.secondary};
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

  ${({ theme, ...props }) =>
    props['data-page-node-type'] === PageNodeType.Track
      ? `
    display: grid;
    justify-content: normal;
    gap: ${theme.spacing.xs};
    flex: 1;
    border-style: dashed;
    grid-auto-flow: ${props.axis === PageNodeAxis.Row ? 'column' : 'row'};
  `
      : ''}
`;

export const DefaultComponent = styled.div<CatalogComponentProps>`
  height: 10rem;
`;

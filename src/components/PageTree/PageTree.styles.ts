import styled from 'styled-components';
import { Optional } from '../../types';
import { Item } from './Item';
import { Container } from './Container';

export enum TDirection {
  row = 'row',
  column = 'column',
}

export enum TSide {
  undetermined = 'undetermined',
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

export type TNode = Container | Item;

export interface ChildDirection {
  id?: string;
  direction: TDirection;
  components: Array<ChildComponent | ChildDirection>;
}

export interface ChildComponent {
  id: string;
  type: string;
  direction: undefined;
}

export type TParent = Container | null;

export type ContainerConstructor = Optional<ChildDirection> & {
  parentDirection?: TDirection;
};

export interface RemovedItemResult {
  removedItem: Item;
  lastComponentId?: string;
  removedContainerId?: string;
}

const getDimensions = (position: TSide, inDirection?: boolean) => {
  const dimensions = ['10px', `calc(100% + ${!inDirection ? 2 : 0}px)`];
  let offset = TSide.bottom;
  if ([TSide.top, TSide.bottom].includes(position)) {
    dimensions.reverse();
    offset = TSide.right;
  }
  const [width, height] = dimensions;

  return {
    width,
    height,
    offset,
  };
};

export const PageTreeContainer = styled.div<{
  insertTo: TSide;
  lastIndex: boolean;
}>`
  margin: 15px;
  flex-grow: 1;
  position: relative;
  border: 2px solid #9d9d9d;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  padding: 12px 50px 11px 32px;
  ${({ lastIndex }) =>
    !lastIndex &&
    `
    &:after {
      content: '';
      align-self: center;
      height: 75%;
      width: 2px;
      background: #9d9d9d;
      position: relative;
      left: 68px;
      z-index: 0;
    }
  `}
`;

export const Type = styled.p<{ inside?: boolean }>`
  width: ${({ inside }) => (inside ? '100%' : '')};
  outline: none;
  position: absolute;
  left: 10px;
  font-size: ${({ inside }) => (inside ? '20px' : '15px')};
  top: ${({ inside }) => (inside ? '' : '-15px')};
  background: ${({ inside }) => (inside ? 'transparent' : 'white')};
  border-radius: 20px;
  padding: 5px;
  box-sizing: border-box;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Configure = styled.div`
  width: calc(9px * 2);
  height: calc(34px * 2);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  left: 78px;
  cursor: w-resize;
  z-index: 1;
  align-self: center;
`;

export const Ratios = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5px 0;
`;

export const Ratio = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px solid;
  margin: 2.5px;
  cursor: pointer;
`;

export const Indicator = styled.div<{
  position?: TSide;
  inDirection?: boolean;
}>`
  position: absolute;
  border-radius: 10px;
  background: #098edf;
  display: none;
  z-index: 100;
  ${({ position, inDirection }) => {
    if (position && position !== TSide.undetermined) {
      const { width, height, offset } = getDimensions(position, inDirection);

      return `
         display: flex;
         width: ${width};
         height: ${height};
         ${position}: -5.5px;
         ${offset}: ${inDirection ? 0 : -1}px;
         pointer-events: none;
          `;
    }
    return ``;
  }}
`;

const getStylesFromDirection = (direction: TDirection, ratio: string) => {
  if (direction === TDirection.row) {
    return `
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: ${ratio
        .split(':')
        .map((value) => `${value}fr`)
        .join(' ')};
      flex-direction: ${direction};
      position: relative;
    `;
  }
  return `
    flex-direction: ${direction};
  `;
};

export const DirectionContainer = styled.div<{
  direction: TDirection;
  ratio: string;
  showPreview?: boolean;
}>`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  ${({ direction, ratio }) => getStylesFromDirection(direction, ratio)}
  ${({ showPreview }) => (showPreview ? `padding: 0` : '')}
`;

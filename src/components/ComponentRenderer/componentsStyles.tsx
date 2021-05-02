import styled from 'styled-components';
import { TSide } from '../../utils/tree';

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

export const Container = styled.div<{
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
  ${({ lastIndex }) => (!lastIndex && `
    &:after {
      content: '';
      align-self: center;
      height: 75%;
      width: 2px;
      background: #9d9d9d;
      position: relative;
      left: 17px;
      z-index: 0;
    }
  `)}
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
  display: block;
  background: #fff url(/slider.e3ab518a.svg) 50% no-repeat;
  position: relative;
  left: 27px;
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

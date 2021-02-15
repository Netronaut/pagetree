import styled from 'styled-components';
import { TSide } from 'utils/tree';

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
  background: string;
}>`
  flex-grow: 1;
  position: relative;
  border: 1px solid;
  background: ${({ background }) => (background ? background : '#ffffff')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
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
  box-sizing: border-box;
  outline: none;
  position: absolute;
  right: 6px;
  top: -8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: grey;
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
  }}
`;

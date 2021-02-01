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

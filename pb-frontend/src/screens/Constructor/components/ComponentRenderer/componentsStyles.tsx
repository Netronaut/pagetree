import styled from 'styled-components';
import { TSide } from 'src/utils/tree';

const getDimensions = (position: TSide) => {
  const dimensions = ['5px', '100%'];
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
}>`
  flex-grow: 1;
  position: relative;
  border: 1px solid;
  background: #ffffff;
  padding: 20px;
  min-height: 100px;
  box-sizing: border-box;
`;

export const Indicator = styled.div<{
  position?: TSide;
  inDirection?: boolean;
}>`
  position: absolute;
  border-radius: 10px;
  background: #098edf;
  display: none;
  z-index: ${({ inDirection }) => (inDirection ? -1 : 0)};
  ${({ position }) => {
    if (position && position !== TSide.undetermined) {
      const { width, height, offset } = getDimensions(position);

      return `
         display: flex;
         width: ${width};
         height: ${height};
         ${position}: 0px;
         ${offset}: 0px;
         pointer-events: none;
          `;
    }
  }}
`;

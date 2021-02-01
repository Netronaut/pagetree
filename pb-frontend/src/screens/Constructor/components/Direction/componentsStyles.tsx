import styled from 'styled-components';
import { TDirection } from 'utils/tree';

const getStylesFromDirection = (direction: TDirection) => {
  const padding = ['5px', '0'];
  if (direction === TDirection.column) {
    padding.reverse();
  }

  return `
      flex-direction: ${direction};
      padding: ${padding.join(' ')}
  `;
};

export const DirectionWrapper = styled.div<{
  direction: TDirection;
}>`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  ${({ direction }) => getStylesFromDirection(direction)}
`;

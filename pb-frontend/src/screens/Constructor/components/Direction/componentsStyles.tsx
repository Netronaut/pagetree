import styled from 'styled-components';
import { TDirection } from 'utils/tree';

const getStylesFromDirection = (
  direction: TDirection,
  componentsCount: number,
) => {
  const padding = ['15px', '0', '0', '0'];
  const gridTemplateColumns = new Array(componentsCount).fill(
    `${100 / componentsCount}%`,
  );
  if (direction === TDirection.column) {
    padding.reverse();
  } else if (direction === TDirection.row) {
    return `
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: ${gridTemplateColumns.join('')};
      flex-direction: ${direction};
      padding: ${padding.join(' ')};
    `;
  }
  return `
      flex-direction: ${direction};
  `;
};

export const DirectionWrapper = styled.div<{
  direction: TDirection;
  componentsCount: number;
}>`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  ${({ direction, componentsCount }) =>
    getStylesFromDirection(direction, componentsCount)}
`;

import styled from 'styled-components';
import { TDirection } from 'utils/tree';

const getStylesFromDirection = (direction: TDirection, ratio: string) => {
  const padding = ['15px', '0', '0', '0'];

  if (direction === TDirection.column) {
    padding.reverse();
  } else if (direction === TDirection.row) {
    return `
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: ${ratio
        .split(':')
        .map((value) => `${value}fr`)
        .join(' ')};
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
  ratio: string;
}>`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  ${({ direction, ratio }) => getStylesFromDirection(direction, ratio)}
`;

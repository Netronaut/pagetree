import styled from 'styled-components';
import { TDirection } from '../../tree';

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
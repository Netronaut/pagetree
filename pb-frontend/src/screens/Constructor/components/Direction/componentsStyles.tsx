import styled from 'styled-components';

export const DirectionWrapper = styled.div<{
  direction: 'column' | 'row';
}>`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;

  ${({ direction }) => {
    if (direction === 'row') {
      return `
          padding: 5px 0;
          `;
    } else if (direction === 'column') {
      return `
        padding: 0 5px;
          `;
    }
  }}
`;

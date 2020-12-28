import styled from 'styled-components';
type Props = { horizontal?: boolean };

export enum InsertTo {
  undetermined = 'undetermined',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export const MainContainer = styled.div<Props>`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border: 1px solid;
  ${({ horizontal }) => {
    if (horizontal) {
      return `
           flex-direction: row;
           border: none;
      `;
    }
  }}
`;

export const Indicator = styled.div<{
  position: InsertTo;
}>`
  position: absolute;
  border-radius: 10px;
  background: #098edf;
  display: none;
  z-index: -1;
  ${({ position }) => {
    if (position !== 'undetermined') {
      return `
         display: flex;
         width: ${position === 'top' || position === 'bottom' ? '100%' : '5px'};
         height: ${
           position === 'left' || position === 'right' ? '100%' : '5px'
         };
         ${position}: 0px;
          `;
    }
  }}
`;

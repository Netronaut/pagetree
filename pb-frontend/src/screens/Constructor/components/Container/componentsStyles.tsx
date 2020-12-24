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
  /*  resize: both;
  overflow: auto;
  min-height: 50px;
  min-width: 50px;*/
  flex-grow: 1;

  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  justify-content: center;
  align-content: center;
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

  ${({ position }) => {
    if (position === 'top' || position === 'bottom') {
      return `
         display: flex;
         width: 100%;
         height: 5px;
         ${position}: 0px;
          `;
    }
    if (position === 'left' || position === 'right') {
      return `
        display: flex;
        width: 5px;
        height: 100%;
        ${position}: 0px;
    `;
    }
  }}
`;

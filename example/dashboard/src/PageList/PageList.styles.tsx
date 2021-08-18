import styled from 'styled-components';

export const ListHead = styled.div`
  display: grid;
  align-items: center;
  gap: 2em;
  grid-template-columns: auto 1fr auto;
`;

export const Table = styled.table`
  text-align: left;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  line-height: 4em;

  th,
  td {
    border-bottom: solid ${({ theme }) => theme.color.gray4} 1px;
  }

  td {
    cursor: pointer;
    white-space: nowrap;

    &:nth-child(2) {
      line-height: 1;
      text-overflow: ellipsis;
    }
  }

  th {
    &:nth-child(1) {
      width: 2em;
    }

    &:nth-child(3) {
      width: 4em;
    }

    &:nth-child(4) {
      width: 12em;
    }
  }
`;

export const QuickActionGrid = styled.div<{ visible: boolean }>`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 0.5em;

  ${({ visible }) => `visibility: ${visible ? 'visible' : 'hidden'};`}
`;

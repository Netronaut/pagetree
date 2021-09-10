import styled from 'styled-components';

export const ListHead = styled.div`
  display: grid;
  align-items: center;
  gap: 2em;
  grid-template-columns: auto 1fr auto;
`;

export const ListHeadTitle = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
  grid-auto-flow: column;
  align-items: center;
`;

export const QuickActionGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 0.5em;

  visibility: hidden;
`;

export const Table = styled.table`
  text-align: left;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;

  th,
  td {
    border-bottom: solid ${({ theme }) => theme.color.gray3} 1px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    line-height: 4;
  }

  td {
    cursor: pointer;
    white-space: nowrap;

    &:nth-child(2) {
      text-overflow: ellipsis;
    }
  }

  th {
    &:nth-child(1) {
      width: 4em;
    }

    &:nth-child(3) {
      width: 4em;
    }

    &:nth-child(4) {
      width: 12em;
    }
  }

  tr:hover {
    ${QuickActionGrid} {
      visibility: visible;
    }
  }
`;

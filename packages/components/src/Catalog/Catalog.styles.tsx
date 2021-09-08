import styled from 'styled-components';
import { Default } from '../Typography';

export const CatalogRoot = styled.div<{ hide: boolean; expanded: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 8px 0px #13592220;

  user-select: none;

  ${({ hide, expanded, theme }) => `
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    background: ${theme.color.white};
    right: ${theme.spacing.md};
    bottom: ${theme.spacing.lg};
    
    ${hide && `display: none;`}

    ${
      expanded &&
      `
      cursor: pointer;
      left: ${theme.spacing.md};
      padding: ${theme.spacing.sm};
    `
    }
  `}
`;

export const CatalogHeader = styled.div<{ expanded: boolean }>`
  display: grid;
  align-items: center;

  ${({ expanded, theme }) =>
    expanded &&
    `
      gap: ${theme.spacing.md};
      grid-template-columns: 1fr 1fr 0fr;
    `}
`;

export const CatalogBody = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  margin-top: ${({ theme }) => theme.spacing.md};

  ::-webkit-scrollbar {
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.secondary};
    border-radius: 3px;
  }
`;

export const CatalogTags = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  overflow: hidden;
  justify-self: start;
`;

export const CatalogItem = styled(Default).attrs(() => ({ as: 'div' }))`
  display: flex;
  position: relative;
  min-width: 180px;
  max-width: 180px;
  height: 110px;
  padding: 0.5em;
  cursor: grab;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border-radius: 4px;
  white-space: nowrap;

  user-select: none;

  ${({ theme }) => `
    border: 1px solid ${theme.color.gray3};
    color: ${theme.color.gray3};
  `}

  :after {
    content: '';
    border-top: 1px solid ${({ theme }) => theme.color.gray3};
    position: absolute;
    bottom: 2.2em;
    width: 180px;
  }

  :hover {
    ${({ theme }) => `
      border-color: ${theme.color.secondary};
      color: ${theme.color.secondary};

      :after {
        border-color: ${theme.color.secondary};
      }
    `}
  }
`;

export const CatalogOpenCloseButton = styled.button<{ expanded: boolean }>`
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;

  ${({ expanded, theme }) =>
    expanded
      ? `
    span {
      display: none;
    }

    svg path {
      stroke: ${theme.color.gray2};
    }

    :hover svg path {
      stroke: ${theme.color.secondary};
    }
    `
      : `
    svg {
      transform: scale(0.75) rotate(45deg);

      path {
        stroke: ${theme.color.secondary};
        stroke-width: 3;
      }
    }
  `}
`;

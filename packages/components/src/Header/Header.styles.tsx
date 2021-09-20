import styled from 'styled-components';
import { Button } from '../Button';
import { IconButton } from '../icons';

export const HeaderRoot = styled.header`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  grid-column-gap: ${({ theme }) => theme.spacing.xxs};
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.interface};

  ${({ theme }) => `
    left: ${theme.spacing.md};
    right: ${theme.spacing.md};
    top: ${theme.spacing.md};
  `}

  ${IconButton} {
    padding: ${({ theme }) => theme.spacing.xs};
    border-right: 1px solid ${({ theme }) => theme.color.gray4};
    height: 100%;
    :last-child {
      border-right: none;
    }
  }
`;

export const HeaderIcon = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const HeaderGroup = styled.div<{ padding?: string; columnNumber?: number }>`
  display: flex;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 8px 0px #13592233;
  border-radius: 4px;
  ${({ padding, theme }) => padding && `padding: ${theme.spacing[padding]}`};
  ${({ columnNumber }) => columnNumber && `grid-column: ${columnNumber}`};
  ${Button} {
    min-width: 134px;
    line-height: 15px;
    font-size: 13px;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: ${({ theme }) => theme.spacing.xxs};
  ${IconButton} {
    padding-right: ${({ theme }) => theme.spacing.xs};
    padding-left: ${({ theme }) => theme.spacing.xl};
    :last-child {
      border-right: 1px solid ${({ theme }) => theme.color.gray4};
    }
  }
`;

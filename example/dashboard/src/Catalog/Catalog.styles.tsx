import styled from 'styled-components';
import { Default } from '../Typography';
import { IconButton } from '../icons/IconButton';

export const CatalogWrapper = styled.div<{ expanded: boolean }>`
  height: ${({ expanded }) => (expanded ? '200px' : '44px')};
  width: ${({ expanded }) => (expanded ? '100vw' : '190px')};
  position: fixed;
  display: flex;
  justify-content: flex-end;
  cursor: ${({ expanded }) => (expanded ? 'default' : 'pointer')};
  right: ${({ expanded, theme }) => (expanded ? 0 : theme.spacing.md)};
  bottom: ${({ expanded, theme }) => (expanded ? 0 : theme.spacing.lg)};
  border-radius: ${({ expanded }) => (expanded ? 0 : '4px')};
  box-shadow: 0px 3px 12px rgba(33, 33, 33, 0.3);
  background: ${({ theme }) => theme.color.white};
  & > div > div > input {
    margin-top: ${({ theme }) => theme.spacing.xxs};
    line-heigth: 22px;
    height: 33px;
  }

  & > button {
    border: 0;
    position: relative;
    top: ${({ expanded }) => (expanded ? 0 : 'auto')};
    bottom: ${({ expanded }) => (expanded ? 'auto' : 0)};
    right: 0;
    width: ${({ expanded }) => (expanded ? '60px' : '220px')};
    transform: ${({ expanded }) => (expanded ? 'scale(1,1)' : 'scale(0.75,0.75)')};
    height: ${({ expanded }) => (expanded ? '60px' : '44px')};
    line-height: ${({ expanded }) => (expanded ? '60px' : '44px')};
    display: block;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: ${({ expanded }) => (expanded ? 'center' : 'flex-end')};

    &:hover > svg line {
      stroke: ${({ theme, expanded }) => (expanded ? theme.color.gray2 : theme.color.secondary)};
    }
    & > svg {
      & line {
        stroke: ${({ theme, expanded }) => (expanded ? theme.color.gray3 : theme.color.secondary)};
        stroke-width: ${({ expanded }) => (expanded ? 1 : 3)};
      }
      ${({ expanded }) => (expanded ? 'transform: rotate(0deg)' : 'transform: rotate(45deg)')}
    }
  }
`;

export const CatalogHeader = styled.div<{ expanded: boolean }>`
  width: calc(100vw - 60px);
  right: 60px;
  position: absolute;
  max-height: 66px;
  justify-content: flex-start;
  top: 0;
  user-select: none;
  --webkit-user-select: none;
  --moz-user-select: none;
  display: flex;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.md}`};
  & > *:first-child {
    flex: 0 1 300px;
  }
`;

export const CatalogToggleLabel = styled(Default)`
  position: absolute;
  left: 0;
  min-width: 140px;
  flex: 0 1 70%;
  white-space: no-wrap;
  text-align: center;
  line-height: 44px;
`;

export const CatalogCloseButton = styled(IconButton)`
  background: none;
  cursor: pointer;
  flex: 0 1 44px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const CatalogTags = styled.div<{ expanded: boolean }>`
  flex: 0 1 80%;
  overflow: hidden;
  white-space: nowrap;
  margin-left: ${({ theme }) => theme.spacing.xs};
  padding-top: ${({ theme }) => theme.spacing.xxs};
`;

export const CatalogContainer = styled.div`
  overflow-x: scroll;
  position: absolute;
  height: 140px;
  top: 60px;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.color.white};
  width: 100%;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #69bbfd;
    border-radius: 3px;
  }
`;

export const CatalogItem = styled.div`
  flex: 1;
  min-width: 180px;
  max-width: 180px;
  border: 2px solid purple;
  box-sizing: border-box;
    
  min-height: 110px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  box-sizing: border-box;
  display: grid;
  align-items: flex-end;
  justify-content: center;
  cursor: move;
  user-select: none;
  --webkit-user-select: none;
  --moz-user-select: none;
  height: 80px;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0 15px 0;
  color: ${({ theme }) => theme.color.gray3};
  &:hover {
    border-color: ${({ theme }) => theme.color.secondary};
  }
  &:hover > div {
    color: ${({ theme }) => theme.color.secondary};
    border-top-color: ${({ theme }) => theme.color.secondary};
  }
  & > div {
    display: grid;
    width: 180px;
    line-height: 2;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color ${({ theme }) => theme.color.gray3};
  }
`;

/*

border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.gray3};
  */

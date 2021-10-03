import styled from 'styled-components';
import { Button } from '..';
import { Default } from '../Typography';

export const Text = styled(Default)`
  font-size: 10px;
`;
export const TextCapitalized = styled(Default)`
  margin-top: ${({ theme }) => theme.spacing.xxs};
  text-transform: uppercase;
  font-size: 8px;
`;
export const TextGray = styled(Text)`
  color: #808080;
  font-weight: 500;
`;

export const LogList = styled.ul`
  border-left: 2px solid ${({ theme }) => theme.color.gray3};
`;

export const RevertButtonContainer = styled.div`
  visibility: hidden;
  position: absolute;
  right: 0;
`;

export const LogItemRoot = styled.li<{ selected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: 0 95px 0 ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  :hover {
    ${RevertButtonContainer} {
      visibility: visible;
    }
  }
  :before {
    content: '';
    position: absolute;
    left: -8px;
    top: 2px;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.color.secondary};
    background-color: ${({ selected, theme }) =>
      selected ? theme.color.secondary : theme.color.gray3};
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
  :first-child:after {
    content: '';
    position: absolute;
    left: -5px;
    top: 0;
    width: 8px;
    height: 2px;
    background: ${({ theme }) => theme.color.white};
  }
  :last-child:after {
    content: '';
    position: absolute;
    left: -5px;
    bottom: -15px;
    width: 8px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.white};
  }
`;

export const LogItemDetail = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const LogItemDetailItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  display: grid;
  grid-template: 1fr / minmax(45px, 1fr) 3fr;
  grid-gap: ${({ theme }) => theme.spacing.xs};
  :last-child {
    margin-bottom: 0;
  }
`;

import styled from 'styled-components';
import { Button } from '..';
import { Default } from '../Typography';

export const Text = styled(Default)`
  font-size: 10px;
`;
export const TextCapitalized = styled(Default)`
  margin-top: 0.5em;
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

export const RevertButton = styled(Button)`
  min-width: 80px;
  background: ${({ theme }) => theme.color.gray3};
  line-height: 25px;
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
  padding-left: 0.6em;
  margin-top: 0.9em;
  margin-bottom: 1.1em;
`;

export const LogItemDetailItem = styled.li`
  margin-bottom: 0.5em;
  display: grid;
  grid-template: 1fr/ 1fr 3fr;
  grid-gap: 6px;
  :last-child {
    margin-bottom: 0;
  }
`;

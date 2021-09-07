import styled from 'styled-components';
import { Smaller } from '../Typography';

interface TagProps {
  selected?: boolean;
}

export const Tag = styled(Smaller).attrs({ as: 'button' })<TagProps>`
  min-width: 110px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  line-height: 2;
  background: none;
  color: ${({ theme }) => theme.color.gray3};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 15px;

  :hover {
    color: ${({ theme }) => theme.color.secondary};
    border-color: ${({ theme }) => theme.color.secondary};
  }

  ${({ theme, selected }) =>
    selected &&
    `
    border-color: transparent;
    background: ${theme.color.gray3};
    color: ${theme.color.white};

    &:hover {
      border-color: transparent;
      background: ${theme.color.secondary};
      color: ${theme.color.white};
    }  
  `}
`;

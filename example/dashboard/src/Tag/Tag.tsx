import styled from 'styled-components';
import { Smaller } from '../Typography';

interface TagProps {
  selected?: boolean;
}

export const Tag = styled(Smaller).attrs({ as: 'button' })<TagProps>`
  min-width: 110px;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  line-height: 25px;
  height: 30px;
  margin: 0 ${({ theme }) => theme.spacing.xs} 0 0;
  border-radius: 15px;
  ${({ theme, selected }) => `
    border-color: ${selected ? 'transparent' : theme.color.gray3};
    background: ${selected ? theme.color.gray3 : 'transparent'};
    color: ${selected ? '#FFF' : theme.color.gray3};
    &:hover {
      border-color: ${selected ? 'transparent' : theme.color.gray2};
      background: ${selected ? theme.color.secondary : 'transparent'};
      color: ${selected ? '#FFF' : theme.color.gray2};
    }  
  `}
`;

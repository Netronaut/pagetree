import styled from 'styled-components';
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from './EditIcon';
import { SearchIcon } from './SearchIcon';
import { StarIcon } from './StarIcon';

export const IconButton = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    ${DeleteIcon}, ${EditIcon}, ${SearchIcon}, ${StarIcon} {
      --icon-button-hover-color: ${({ theme }) => theme.color.secondary};

      path {
        stroke: var(--icon-button-hover-color);
      }
    }
  }
`;

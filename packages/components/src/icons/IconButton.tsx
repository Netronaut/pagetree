import styled from 'styled-components';

export interface IconButtonProps {
  active?: boolean;
}

export const IconButton = styled.button<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    color: ${({ theme, active }) => (active ? theme.color.secondary : theme.color.gray3)};
  }

  &:hover {
    svg {
      --icon-button-hover-color: ${({ theme }) => theme.color.secondary};

      path {
        stroke: var(--icon-button-hover-color);
      }
    }
  }
`;

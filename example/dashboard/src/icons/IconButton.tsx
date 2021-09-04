import styled from 'styled-components';

export const IconButton = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    svg {
      --icon-button-hover-color: ${({ theme }) => theme.color.secondary};

      path {
        stroke: var(--icon-button-hover-color);
      }
    }
  }
`;

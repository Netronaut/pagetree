import styled from 'styled-components';

export const HeaderIconButton = styled.button`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: transparent;

  svg {
    width: 36px;
    height: 36px;
  }

  :hover svg {
    fill: ${({ theme }) => theme.color.primary};
  }
`;

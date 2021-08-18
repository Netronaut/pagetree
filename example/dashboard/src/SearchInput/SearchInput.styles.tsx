import styled, { StyledComponent } from 'styled-components';
import { DefaultTypographyProps, Smaller } from '../Typography';

export const SearchInputRoot = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: calc(50% - 22px / 2);
    left: 9px;
  }
`;

export const Input = styled(Smaller).attrs({
  as: 'input',
})`
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  background: ${({ theme }) => theme.color.gray4};
  color: ${({ theme }) => theme.color.gray2};
  border: none;
  width: 100%;
  outline-color: ${({ theme }) => theme.color.secondary};
` as StyledComponent<'input', never, DefaultTypographyProps & { as?: string }>;

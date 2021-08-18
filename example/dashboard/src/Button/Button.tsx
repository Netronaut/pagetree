import styled from 'styled-components';
import { MediumBold } from '../Typography';

export interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = styled(MediumBold).attrs({ as: 'button' })<ButtonProps>`
  min-width: 160px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  line-height: 38px;

  ${({ theme, primary, secondary }) => `
    background: ${
      primary ? theme.color.primary : secondary ? theme.color.secondary : 'transparent'
    };
    color: ${primary || secondary ? theme.color.white : theme.color.gray4}};
  `}
`;

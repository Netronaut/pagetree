import styled from 'styled-components';
import { Default } from '../Typography';

export const InputRoot = styled.div<{ hasIcon: boolean }>`
  ${({ hasIcon }) =>
    hasIcon
      ? `
      position: relative;

      svg {
        position: absolute;
        top: calc(50% - 24px / 2);
        left: 9px;
      }
    `
      : ''}
`;

export const InputElement = styled(Default).attrs({
  as: 'input',
})<{ hasIcon: boolean }>`
  border-radius: 4px;
  border: none;
  line-height: 1.5;
  padding: 0.5em;
  width: 100%;

  ${({ hasIcon, theme }) => `
    ${hasIcon ? `padding-left: 2.5rem;` : ''}

    background: ${theme.color.gray4};
    color: ${theme.color.gray2};
    outline-color: ${theme.color.secondary};
  `}
`;

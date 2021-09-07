import styled from 'styled-components';
import { Smaller } from '../Typography';

export const TooltipTip = styled(Smaller)<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  --tooltip-background: ${({ theme }) => theme.color.gray1};
  --tooltip-color: ${({ theme }) => theme.color.white};
  position: absolute;
  display: none;
  border-radius: 2px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25em 1em;
  z-index: 100;
  white-space: nowrap;
  text-align: center;
  background: var(--tooltip-background);
  color: var(--tooltip-color);

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    height: 0;
    width: 0;
    margin-left: calc(6px * -1);
    border: solid transparent;
    border-width: 6px;
    pointer-events: none;
  }

  ${({ position }) => {
    if (position === 'top')
      return `
        top: calc(30px * -1 - 5px);
        :before {
          top: 100%;
          border-top-color: var(--tooltip-background);
        }
    `;
    if (position === 'right')
      return `
        left: calc(100% + 10px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        ::before {
          left: calc(6px * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: var(--tooltip-background);
        }
    `;
    if (position === 'bottom')
      return `
        bottom: calc(30px * -1);
        :before {
          bottom: 100%;
          border-bottom-color: var(--tooltip-background);
        }
    `;
    if (position === 'left')
      return `
        left: auto;
        right: calc(100% + 10px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        :before {
          left: auto;
          right: calc(6px * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: var(--tooltip-background);
        }
    `;
  }}
`;

export const TooltipCapture = styled.div`
  display: flex;
  width: fit-content;
  position: relative;

  :hover ${TooltipTip} {
    display: block;
  }
`;

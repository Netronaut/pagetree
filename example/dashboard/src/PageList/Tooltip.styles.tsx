import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const TooltipTip = styled.div<{ direction: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
  border-radius: 1px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 11px;
  background: #333333;
  font-family: sans-serif;
  z-index: 100;
  white-space: nowrap;
  color: #fff;
  //styleName: Smaller;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;

  &:before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }
  ${({ direction }) => {
    if (direction === 'top')
      return `
        top: calc(30px * -1 - 5px);
        :before {
          top: 100%;
          border-top-color: #333333;
        }
    `;
    if (direction === 'right')
      return `
        left: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        ::before {
          left: calc(6px * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: #333333;
        }
    `;
    if (direction === 'bottom')
      return `
        bottom: calc(30px * -1);
        :before {
          bottom: 100%;
          border-bottom-color: #333333;
        }
    `;
    if (direction === 'left')
      return `
        left: auto;
        right: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        :before {
          left: auto;
          right: calc(6px * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: #333333;
        }
    `;
  }}
`;

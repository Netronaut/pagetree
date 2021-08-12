import React, { ReactElement, useState } from 'react';
import { TooltipWrapper, TooltipTip } from './Tooltip.styles';

export interface TooltipProps {
  children: ReactElement;
  content: ReactElement | string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = ({ direction, delay, children, content }: TooltipProps): ReactElement => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay ?? 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <TooltipTip direction={direction || 'top'}>{content}</TooltipTip>}
    </TooltipWrapper>
  );
};

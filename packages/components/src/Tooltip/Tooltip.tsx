import React, { ReactElement, ReactNode } from 'react';
import { TooltipCapture, TooltipTip } from './Tooltip.styles';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({
  position = 'top',
  children,
  content,
  ...props
}: TooltipProps): ReactElement => (
  <TooltipCapture {...props}>
    {children}
    <TooltipTip position={position}>{content}</TooltipTip>
  </TooltipCapture>
);

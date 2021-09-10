import React, { ReactElement, ReactNode } from 'react';
import { TooltipRoot, TooltipTip } from './Tooltip.styles';

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
  <TooltipRoot {...props}>
    {children}
    <TooltipTip position={position}>{content}</TooltipTip>
  </TooltipRoot>
);

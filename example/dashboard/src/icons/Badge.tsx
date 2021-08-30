import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SmallerBold } from '../Typography';
interface BadgeProps {
  value?: number;
  children: ReactElement;
}

export const Badge = ({ value, children }: BadgeProps): ReactElement => (
  <BadgeRoot>
    {value !== undefined && value > 0 && <BadgeContent>{value}</BadgeContent>}
    {children}
  </BadgeRoot>
);

const BadgeRoot = styled.div`
  position: relative;
  height: 24px;
`;

const BadgeContent = styled(SmallerBold).attrs({ as: 'div' })`
  position: absolute;
  top: -5px;
  right: -6px;
  height: 14px;
  min-width: 20px;
  display: flex;
  justify-content: center;
  border-radius: 7px;
  background: ${({ theme }) => theme.color.secondary};
  padding: 0 3px;
  color: ${({ theme }) => theme.color.white};
`;

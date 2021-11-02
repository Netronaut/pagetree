import React, { ReactElement } from 'react';
import { CatalogComponentProps } from '@pagetree/builder';
import styled from 'styled-components';

const TestComponentRoot = styled.div`
  background: #fde;
  background-size: cover;
  height: 200px;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

export const TestComponent = ({ config }: CatalogComponentProps): ReactElement => {
  return <TestComponentRoot>{config?.testComponent}</TestComponentRoot>;
};

import React from 'react';
import styled from 'styled-components';

import { ProductionComponentProps, createCatalogComponent } from '@pagio/builder';

const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  min-height: 73px;
  width: 100%;
`;

const Label = styled.span`
  font-size: 30px;
  border-left: red 5px solid;
  padding: 0 10px;
`;

const Production: React.FC<ProductionComponentProps> = ({ config }) => {
  return <Label>{config?.headline}</Label>;
};

export default createCatalogComponent(Container, Production, {
  type: 'headline',
  label: 'Headline',
});

import * as React from 'react';
import styled from 'styled-components';

import {
  ProductionComponentProps,
  createCatalogComponent,
} from '../../../src';
// } from '@pagio/builder';

const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  /* position: relative; */
  height: 50px;
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
  type: 'Headline',
  componentName: 'Headline',
  props: [{ fieldName: 'headline', label: 'Headline' }],
});

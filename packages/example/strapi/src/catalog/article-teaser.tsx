import * as React from 'react';
import styled from 'styled-components';

import { createCatalogComponent, ProductionComponentProps } from '@pagetree/builder';

const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  height: 200px;
  width: 100%;
`;

const ProductionContainer = styled.div`
  background: no-repeat url('https://picsum.photos/480/600');
  background-size: cover;
  height: 200px;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

const Production: React.FC<ProductionComponentProps> = ({ config }) => {
  return <ProductionContainer>{config?.articleId}</ProductionContainer>;
};

export default createCatalogComponent(Container, Production, {
  type: 'article-teaser',
  label: 'Article Teaser',
});

import React, { ReactElement } from 'react';
import { CatalogComponentProps } from '@pagetree/builder';
import styled from 'styled-components';

const Label = styled.h2`
  font-size: 30px;
  border-left: red 5px solid;
  padding: 0 10px;
`;

export const Headline = ({ config }: CatalogComponentProps): ReactElement => {
  return <Label>{config?.headline}</Label>;
};

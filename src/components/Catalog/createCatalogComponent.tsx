import React from 'react';
import { CatalogComponent } from '../../types';
import { ProductionComponentProps } from './Catalog.types';

export const createCatalogComponent = (
  WrappedComponent: React.FC,
  ProductionWrappedComponent: React.FC<ProductionComponentProps>,
  configuration: {
    type: string;
    label?: string;
    props?: { fieldName: string; label: string }[];
  },
): CatalogComponent => {
  const Component = () => <WrappedComponent />;

  Component.type = configuration.type;
  Component.label = configuration.label;

  return Component;
};

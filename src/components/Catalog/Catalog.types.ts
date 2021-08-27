import { FunctionComponent } from 'react';

export type CatalogComponentProps = {
  type: string;
  label?: string;
  tags?: Array<string>;
  config?: Record<string, string>; // TODO remove
};

export type CatalogComponentDescription = CatalogComponentProps & {
  component?: FunctionComponent<CatalogComponentProps>;
  builderComponent?: FunctionComponent<CatalogComponentProps>;
};

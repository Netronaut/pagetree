import React from 'react';
import { TSide } from './tree';
import { TPage } from '../types';
import { Components } from '../hocs/createCatalogComponent';

type TreeContextValue = {
  add: (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => void;
  onConfigChange: (id: string, field: string, value: string) => void;
  config: TPage['config'];
  production?: boolean;
  components?: Components;
};

export const TreeContext = React.createContext({} as TreeContextValue);

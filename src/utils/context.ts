import * as React from 'react';
import { TSide } from './tree';
import { TPage } from '../types';
import { Components } from '../hocs/createCatalogComponent';

type TreeContextValue = {
  add: (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => void;
  onConfigChange: (
    id: string,
    field: string,
    value: string,
    userControlledId?: string,
  ) => void;
  config: TPage['config'];
  showPreview?: boolean;
  components?: Components;
  componentGroups?: string[];
};

export const TreeContext = React.createContext({} as TreeContextValue);

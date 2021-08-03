import { createContext } from 'react';
import { CatalogComponent } from '../components';
import { PageContent } from '../types';
import { TSide } from './tree.types';

type TreeContextValue = {
  add: (e: React.DragEvent<HTMLDivElement>, toId?: string, side?: TSide) => void;
  onConfigChange: (id: string, field: string, value: string, userControlledId?: string) => void;
  config: PageContent['config'];
  showPreview?: boolean;
  components?: Array<CatalogComponent>;
  componentGroups?: string[];
};

export const TreeContext = createContext({} as TreeContextValue);

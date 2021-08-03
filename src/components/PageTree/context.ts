import { createContext } from 'react';
import { PageContent } from '../../types';
import { CatalogComponent } from '../Catalog';
import { TSide } from './PageTree.types';

interface TreeContextValue {
  add: (e: React.DragEvent<HTMLDivElement>, toId?: string, side?: TSide) => void;
  onConfigChange: (id: string, field: string, value: string, userControlledId?: string) => void;
  config: PageContent['config'];
  showPreview?: boolean;
  components?: Array<CatalogComponent>;
}

export const TreeContext = createContext({} as TreeContextValue);

import { Optional } from '../../types';
import { Container } from './Container';
import { Item } from './Item';

export enum TDirection {
  row = 'row',
  column = 'column',
}

export enum TSide {
  undetermined = 'undetermined',
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

export type TNode = Container | Item;

export interface ChildDirection {
  id?: string;
  direction: TDirection;
  components: Array<ChildComponent | ChildDirection>;
}

export interface ChildComponent {
  id: string;
  type: string;
  direction: undefined;
}

export type TParent = Container | null;

export type ContainerConstructor = Optional<ChildDirection> & {
  parentDirection?: TDirection;
};

export interface RemovedItemResult {
  removedItem: Item;
  lastComponentId?: string;
  removedContainerId?: string;
}

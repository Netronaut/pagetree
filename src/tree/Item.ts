import { nanoid } from 'nanoid';
import { TParent } from './tree.types';

export class Item {
  id: string;
  type: string;
  parent: TParent;

  constructor({ id = nanoid(), type }: { id?: string; type: string }) {
    this.type = type;
    this.parent = null;
    this.id = id;
  }
}

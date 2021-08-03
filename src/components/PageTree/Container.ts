import { nanoid } from 'nanoid';
import { Item } from './Item';
import {
  ContainerConstructor,
  RemovedItemResult,
  TDirection,
  TNode,
  TParent,
  TSide,
} from './PageTree.styles';

export const sidesByDirection: Record<TDirection, [TSide, TSide]> = {
  [TDirection.row]: [TSide.left, TSide.right],
  [TDirection.column]: [TSide.top, TSide.bottom],
};

const getItemsOrder = (item1: TNode, item2: TNode, side: TSide) => {
  if ([TSide.top, TSide.left].includes(side)) {
    return [item1, item2];
  }
  return [item2, item1];
};

export class Container {
  id: string;
  parent: TParent;
  direction: TDirection;
  components: TNode[];

  constructor({
    parentDirection,
    direction,
    id = nanoid(),
    components = [],
  }: ContainerConstructor) {
    this.direction =
      direction || (parentDirection === TDirection.column ? TDirection.row : TDirection.column);
    this.id = id;
    this.parent = null;
    this.components = components.map((c) => {
      const component = c.direction ? new Container(c) : new Item(c);
      component.parent = this;
      return component;
    });
  }

  findIndex(item: TNode): number {
    return this.components.findIndex(({ id }) => id === item?.id);
  }

  addOrTransform(newItem: Item, toItem: TNode, side: TSide): void {
    if (!side || side === TSide.undetermined || sidesByDirection[this.direction].includes(side)) {
      this.add(newItem, toItem, side);
    } else {
      this.transform(newItem, toItem, side);
    }
  }

  add(newItem: Item, toItem: TNode, side: TSide): void {
    let nextToIndex = this.findIndex(toItem);

    newItem.parent = this;

    if (nextToIndex === -1) {
      nextToIndex = this.components.length;
    }

    this.components.splice(
      [TSide.right, TSide.bottom].includes(side) ? nextToIndex + 1 : nextToIndex,
      0,
      newItem,
    );
  }

  transform(newItem: Item, itemToTransform: TNode, side: TSide): void {
    const index = this.findIndex(itemToTransform);

    const container = new Container({ parentDirection: this.direction });

    container.parent = this;

    const items = getItemsOrder(newItem, itemToTransform, side);

    for (let i = 0; i < items.length; i++) {
      items[i].parent = container;
    }

    container.components = items;
    this.components.splice(index, 1, container);
  }

  remove(item: Item): RemovedItemResult {
    const index = this.findIndex(item);

    const [removedItem] = this.components.splice(index, 1) as Array<Item>;

    let lastComponentId;
    let removedContainerId;

    if (this.components.length === 1 && this.parent) {
      const lastComponent = this.components[0] as Container;
      if (lastComponent.direction === this.parent.direction) {
        this.parent.replace(this, ...lastComponent.components);
      } else {
        removedContainerId = this.id;
        lastComponentId = lastComponent.id;
        this.parent.replace(this, lastComponent);
      }
    }

    return { removedItem, lastComponentId, removedContainerId };
  }

  replace(item: Container, ...items: TNode[]): void {
    const index = this.findIndex(item);

    for (let i = 0; i < items.length; i++) {
      items[i].parent = this;
    }

    this.components.splice(index, 1, ...items);
  }
}

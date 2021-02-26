import { v4 } from 'uuid';
import { ComponentType } from './componentTypes';
import { Optional } from '../types/helpers';

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

export type TNode = Container | Item;

export type ChildDirection = {
  id?: string;
  direction: TDirection;
  components: Array<ChildComponent | ChildDirection>;
};

export type ChildComponent = {
  id: string;
  type: ComponentType;
  direction: undefined;
};

export type Page = {
  structure: ChildDirection;
  config: Record<string, any>;
};

type TParent = Container | null;

export class Item {
  id: string;
  type: ComponentType;
  parent: TParent;

  constructor({ id = v4(), type }: { id?: string; type: ComponentType }) {
    this.type = type;
    this.parent = null;
    this.id = id;
  }
}

type ContainerConstructor = Optional<ChildDirection> & {
  parentDirection?: TDirection;
};

class Container {
  id: string;
  parent: TParent;
  direction: TDirection;
  components: TNode[];

  constructor({
    parentDirection,
    direction,
    id = v4(),
    components = [],
  }: ContainerConstructor) {
    this.direction =
      direction ||
      (parentDirection === TDirection.column
        ? TDirection.row
        : TDirection.column);
    this.id = id;
    this.parent = null;
    this.components = components.map(c => {
      const component = c.direction ? new Container(c) : new Item(c);
      component.parent = this;
      return component;
    });
  }

  findIndex(item: TNode) {
    return this.components.findIndex(({ id }) => id === item?.id);
  }

  addOrTransform(newItem: Item, toItem: TNode, side: TSide) {
    if (
      !side ||
      side === TSide.undetermined ||
      sidesByDirection[this.direction].includes(side)
    ) {
      this.add(newItem, toItem, side);
    } else {
      this.transform(newItem, toItem, side);
    }
  }

  add(newItem: Item, toItem: TNode, side: TSide) {
    let nextToIndex = this.findIndex(toItem);

    newItem.parent = this;

    if (nextToIndex === -1) {
      nextToIndex = this.components.length;
    }

    this.components.splice(
      [TSide.right, TSide.bottom].includes(side)
        ? nextToIndex + 1
        : nextToIndex,
      0,
      newItem,
    );
  }

  transform(newItem: Item, itemToTransform: TNode, side: TSide) {
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

  remove(item: Item) {
    const index = this.findIndex(item);

    const [removedItem] = this.components.splice(index, 1);

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

    return { removedItem, lastComponentId, removedContainerId } as {
      removedItem: Item;
      lastComponentId?: string;
      removedContainerId?: string;
    };
  }

  replace(item: Container, ...items: TNode[]) {
    const index = this.findIndex(item);

    for (let i = 0; i < items.length; i++) {
      items[i].parent = this;
    }

    this.components.splice(index, 1, ...items);
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_: string, value: TNode) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export class Tree {
  root: Container;

  constructor(container?: ChildDirection) {
    this.root = new Container(
      container || { parentDirection: TDirection.row, id: '0' },
    );
  }

  find(predicate: (node: TNode) => boolean) {
    let data = undefined;
    (function recurse(currentNode: TNode) {
      if (!(currentNode instanceof Item)) {
        currentNode.components.forEach((_, index) => {
          recurse(currentNode.components[index]);
        });
      }

      if (predicate(currentNode)) {
        data = currentNode;
        return;
      }
    })(this.root);

    return data;
  }

  add(item: Item, toId = '0', side: TSide = TSide.undetermined) {
    const toItem = this.find(node => node.id === toId);
    if (toItem) {
      const target = (toItem.parent || toItem) as Container;
      target.addOrTransform(item, toItem, side);
    } else {
      throw new Error('Cannot add node');
    }
  }

  remove(id: string) {
    const itemToRemove = this.find(node => node.id === id);
    if (itemToRemove && itemToRemove.parent) {
      return itemToRemove.parent.remove(itemToRemove as Item);
    } else {
      throw new Error('Cannot remove');
    }
  }

  getValue() {
    return JSON.parse(JSON.stringify(this.root, getCircularReplacer(), '\t'));
  }
}

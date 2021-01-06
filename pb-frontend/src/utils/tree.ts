import { v4 } from 'uuid';
import { ComponentType } from './componentTypes';

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

type TParent = Container | null;

export class Item {
  id: string;
  type: ComponentType;
  parent: TParent;

  constructor(type: ComponentType) {
    this.type = type;
    this.parent = null;
    this.id = v4();
  }
}

class Container {
  id: string;
  parent: TParent;
  direction: TDirection;
  components: TNode[];

  constructor(parentDirection: TDirection, id = v4()) {
    this.direction =
      parentDirection === TDirection.column
        ? TDirection.row
        : TDirection.column;
    this.id = id;
    this.parent = null;
    this.components = [];
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

    const container = new Container(this.direction);

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

    if (this.components.length === 1 && this.parent) {
      const lastComponent = this.components[0] as Container;
      if (lastComponent.direction === this.parent.direction) {
        this.parent.replace(this, ...lastComponent.components);
      } else {
        this.parent.replace(this, lastComponent);
      }
    }

    return removedItem as Item;
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
  return (key: string, value: TNode) => {
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

  constructor(container = new Container(TDirection.row, '0')) {
    this.root = container;
  }

  find(predicate: (node: TNode) => boolean) {
    let data = undefined;
    (function recurse(currentNode: TNode) {
      if (!(currentNode instanceof Item)) {
        currentNode.components.forEach((item, index) => {
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
    const toItem = this.find((node) => node.id === toId);
    if (toItem) {
      const target = (toItem.parent || toItem) as Container;
      target.addOrTransform(item, toItem, side);
    } else {
      throw new Error('Cannot add node');
    }
  }

  remove(id: string) {
    const itemToRemove = this.find((node) => node.id === id);
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

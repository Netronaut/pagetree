import { v4 } from 'uuid';

const getItemsOrder = (item1, item2, side) => {
  if (['top', 'left'].includes(side)) {
    return [item1, item2];
  }
  return [item2, item1];
};

class Container {
  constructor(parentDirection, id = v4()) {
    this.direction = parentDirection === 'column' ? 'row' : 'column';
    this.id = id;
    this.parent = null;
    this.components = [];
  }

  findIndex(item) {
    return this.components.findIndex(({ id }) => id === item?.id);
  }

  add(newItem, nextToItem, side) {
    let nextToIndex = this.findIndex(nextToItem);

    newItem.parent = this;

    if (nextToIndex === -1) {
      nextToIndex = this.components.length;
    }

    this.components.splice(
      ['right', 'bottom'].includes(side) ? nextToIndex + 1 : nextToIndex,
      0,
      newItem,
    );
  }

  transform(newItem, itemToTransform, side) {
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

  remove(item) {
    const index = this.findIndex(item);

    const [removedItem] = this.components.splice(index, 1);

    if (this.components.length === 1 && this.parent) {
      const lastComponent = this.components[0];
      if (lastComponent.direction === this.parent.direction) {
        this.parent.replace(this, ...lastComponent.components);
      } else {
        this.parent.replace(this, lastComponent);
      }
    }

    return removedItem;
  }

  replace(item, ...items) {
    const index = this.findIndex(item);

    for (let i = 0; i < items.length; i++) {
      items[i].parent = this;
    }

    this.components.splice(index, 1, ...items);
  }
}

const sidesForDirections = {
  column: ['top', 'bottom'],
  row: ['left', 'right'],
};

export class Item {
  id;
  type;
  parent;

  constructor({ type, id = v4() }) {
    this.type = type;
    this.parent = null;
    this.id = id;
  }

  add(newItem, side) {
    if (sidesForDirections[this.parent.direction].includes(side)) {
      this.parent.add(newItem, this, side);
    } else {
      this.parent.transform(newItem, this, side);
    }
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
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
  constructor(container = new Container(null, '0')) {
    this.root = container;
  }

  find(predicate) {
    let data = undefined;
    (function recurse(currentNode) {
      currentNode.components &&
        currentNode.components.forEach((item, index) => {
          recurse(currentNode.components[index]);
        });

      if (predicate(currentNode)) {
        data = currentNode;
        return;
      }
    })(this.root);

    return data;
  }

  add(item, toId = '0', side) {
    const itemToAdd = this.find((node) => node.id === toId);
    if (itemToAdd) {
      if (itemToAdd.direction) {
        if (itemToAdd.parent) {
          itemToAdd.parent.add(item, itemToAdd, side);
        } else {
          itemToAdd.add(item);
        }
      } else {
        itemToAdd.add(item, side);
      }
    } else {
      throw new Error('Cannot add node');
    }
  }

  remove(id) {
    const itemToRemove = this.find((node) => node.id === id);
    if (itemToRemove) {
      return itemToRemove.parent.remove(itemToRemove);
    } else {
      throw new Error('Cannot remove');
    }
  }

  getValue() {
    return JSON.parse(JSON.stringify(this.root, getCircularReplacer(), '\t'));
  }
}

import { Container } from './Container';
import { Item } from './Item';
import { ChildDirection, RemovedItemResult, TDirection, TNode, TSide } from './tree.types';

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
    this.root = new Container(container || { parentDirection: TDirection.row, id: '0' });
  }

  find(predicate: (node: TNode) => boolean): TNode | undefined {
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

  add(item: Item, toId = '0', side: TSide = TSide.undetermined): void {
    const toItem = this.find((node) => node.id === toId);
    if (toItem) {
      const target = (toItem.parent || toItem) as Container;
      target.addOrTransform(item, toItem, side);
    } else {
      throw new Error('Cannot add node');
    }
  }

  remove(id: string): RemovedItemResult {
    const itemToRemove = this.find((node) => node.id === id);
    if (itemToRemove && itemToRemove.parent) {
      return itemToRemove.parent.remove(itemToRemove as Item);
    } else {
      throw new Error('Cannot remove');
    }
  }

  getValue(): ChildDirection {
    return JSON.parse(JSON.stringify(this.root, getCircularReplacer(), '\t'));
  }
}

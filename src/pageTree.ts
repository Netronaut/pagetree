import { nanoid } from 'nanoid';
import { DeepPartial } from 'tsdef';
import { InsertionPoint, PageNodeAxis } from './types';
import { vertical, append, matchesAxis } from './utils';

export enum PageNodeType {
  'Track' = 'page-node-track',
}

type PageNodePropsValue = string | boolean | number | Array<PageNodePropsValue>;

export interface PageNodeProps {
  [key: string]: PageNodePropsValue;
}

export interface PageNodeOptions {
  uuid: string;
  type: string;
  props: PageNodeProps;
  axis?: PageNodeAxis;
  childNodes?: Array<PageNodeOptions>;
}

export class PageNode {
  uuid: string;
  type: string;
  props: PageNodeProps;
  axis?: PageNodeAxis;
  parentNode: PageNode | null = null;
  childNodes: Array<PageNode> | null = null;

  constructor(options: DeepPartial<PageNodeOptions>) {
    if (!options.type && !options.childNodes && !options.axis) {
      throw Error('Either type or childNodes|axis must be set');
    }
    this.uuid = options.uuid || nanoid();
    this.props = {};
    this.type = options.type || PageNodeType.Track;

    if (options.childNodes || options.axis) {
      this.childNodes = [];
      this.axis = options.axis || PageNodeAxis.Column;
      options.childNodes &&
        options.childNodes.forEach(
          (childNode) => childNode && this.append(new PageNode(childNode)),
        );
    }
  }

  prepend(childNode: PageNode): this {
    if (!this.childNodes) {
      throw Error('This Node does not have childNodes');
    }
    childNode.parentNode?.remove(childNode);
    this.childNodes.unshift(childNode);
    childNode.parentNode = this;
    return this;
  }

  append(childNode: PageNode): this {
    if (!this.childNodes) {
      throw Error('This Node does not have childNodes');
    }
    childNode.parentNode?.remove(childNode);
    this.childNodes.push(childNode);
    childNode.parentNode = this;
    return this;
  }

  findByUuid(uuid: string): PageNode | null {
    if (this.uuid === uuid) {
      return this;
    }

    if (!this.childNodes) {
      return null;
    }

    for (const childNode of this.childNodes) {
      const found = childNode.findByUuid(uuid);
      if (found) {
        return found;
      }
    }

    return null;
  }

  getChildAt(index: number): PageNode | null {
    return this.childNodes ? this.childNodes[index] : null;
  }

  remove(node: PageNode): this {
    if (!this.childNodes) {
      throw Error('This Node does not have childNodes');
    }
    this.childNodes = this.childNodes.filter((childNode) => childNode !== node);

    return this;
  }

  insertAt(node: PageNode, insertionPoint: InsertionPoint, refNode?: PageNode): this {
    if (!this.childNodes || !this.axis) {
      throw Error('This Node does not have childNodes');
    }

    if (!refNode || refNode === this) {
      const method = append(insertionPoint) ? 'append' : 'prepend';
      return this[method](node);
    }

    node.parentNode?.remove(node);
    let index = this.childNodes.indexOf(refNode);

    if (index === -1) {
      this.childNodes.forEach(
        (childNode) =>
          childNode.type === PageNodeType.Track &&
          childNode.insertAt(node, insertionPoint, refNode),
      );
      return this;
    }

    if (this.childNodes.length > 1 && !matchesAxis(insertionPoint, this.axis)) {
      const newNode = new PageNode({
        axis: vertical(insertionPoint) ? PageNodeAxis.Column : PageNodeAxis.Row,
      }).append(node);
      this.insertAt(
        newNode,
        this.axis === PageNodeAxis.Column ? InsertionPoint.Bottom : InsertionPoint.Right,
        refNode,
      );
      this.remove(refNode);
      newNode[append(insertionPoint) ? 'prepend' : 'append'](refNode);
      return this;
    }

    if (this.childNodes.length <= 1) {
      this.axis = vertical(insertionPoint) ? PageNodeAxis.Column : PageNodeAxis.Row;
    }

    if (append(insertionPoint)) {
      index++;
    }

    this.childNodes = this.childNodes.slice(0, index).concat(node, this.childNodes.slice(index));
    node.parentNode = this;
    return this;
  }

  clean(): void {
    if (!this.childNodes) {
      return;
    }

    if (this.childNodes.length === 1) {
      this.parentNode?.insertAt(this.childNodes[0], InsertionPoint.None, this);
    }

    if (this.childNodes.length === 0) {
      this.parentNode?.remove(this);
      return;
    }

    this.childNodes.forEach((childNode) => childNode.clean());

    return;
  }

  valueOf(): PageNodeOptions {
    return {
      uuid: this.uuid,
      type: this.type,
      props: this.props,
      axis: this.axis,
      childNodes: this.childNodes
        ? this.childNodes.map((childNode) => childNode.valueOf())
        : undefined,
    };
  }

  toString(): string {
    return JSON.stringify(this.valueOf(), null, 2);
  }
}

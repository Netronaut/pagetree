import { InsertionPoint, PageNodeAxis } from './types';

export function vertical(insertionPoint: InsertionPoint, match?: PageNodeAxis): boolean {
  const isVertical = [InsertionPoint.Top, InsertionPoint.Bottom].includes(insertionPoint);
  if (match) {
    return isVertical && match === PageNodeAxis.Column;
  }
  return isVertical;
}

export function horizontal(insertionPoint: InsertionPoint, match?: PageNodeAxis): boolean {
  const isHorizontal = [InsertionPoint.Left, InsertionPoint.Right].includes(insertionPoint);
  if (match) {
    return isHorizontal && match === PageNodeAxis.Row;
  }
  return isHorizontal;
}

export function append(insertionPoint: InsertionPoint): boolean {
  return [InsertionPoint.None, InsertionPoint.Bottom, InsertionPoint.Right].includes(
    insertionPoint,
  );
}

export function matchesAxis(insertionPoint: InsertionPoint, axis: PageNodeAxis): boolean {
  return (
    insertionPoint === InsertionPoint.None ||
    vertical(insertionPoint, axis) ||
    horizontal(insertionPoint, axis)
  );
}

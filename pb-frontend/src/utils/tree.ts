import { v4 } from 'uuid';
type Component = {
  id: string;
  type: string;
};
export type Direction = {
  id: string;
  direction: 'row' | 'column';
  components: Array<Component | Direction>;
};
const getTarget = (root: Direction, path: number[]) => {
  const copy = JSON.parse(JSON.stringify(root));
  let parent = undefined;
  let target = copy;
  let pathIndex = 0;
  for (let i = 0; i < path.length - 1; i++) {
    pathIndex++;
    parent = target;
    target = target.components[path[i]];
  }
  const index = path[path.length - 1];
  const indexInParent = path[path.length - 2];
  return {
    target,
    parent,
    copy,
    index,
    indexInParent,
    pathIndex,
  };
};
export const remove = (root: Direction, path: number[], pathTo?: number[]) => {
  const newPathTo = pathTo;
  const { target, parent, index, indexInParent, copy } = getTarget(root, path);
  const { target: toTarget, pathIndex } = getTarget(copy, pathTo || []);
  const removedItems = target.components.splice(index, 1);
  if (target.components.length === 1 && parent) {
    const replaceObject = target.components[0];
    if (parent.direction === replaceObject.direction) {
      parent.components.splice(
        indexInParent,
        1,
        ...target.components[0].components,
      );
      if (
        newPathTo &&
        toTarget?.id === parent?.id &&
        newPathTo[pathIndex] > indexInParent
      ) {
        newPathTo[pathIndex] =
          newPathTo[pathIndex] + target.components[0].components.length - 1;
      }
    } else {
      parent.components[indexInParent] = replaceObject;
    }
  }
  return { item: removedItems[0], result: copy, newPathTo };
};
export const add = (root: Direction, path: number[], item: Component) => {
  const { target, parent, index, copy } = getTarget(root, path);
  if (!target.components) {
    const indexInParent = path[path.length - 2];
    const connectedItem = target;
    const newDirection: Direction = {
      id: v4(),
      direction: parent.direction === 'row' ? 'column' : 'row',
      components: [],
    };
    const nextToIndex = Number(!index);
    newDirection.components[index] = item;
    newDirection.components[nextToIndex] = connectedItem;
    parent.components[indexInParent] = newDirection;
  } else {
    target.components.splice(index, 0, item);
  }
  return copy;
};

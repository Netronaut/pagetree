import React, { useRef, useState } from 'react';

import Catalog from './components/Catalog';

import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { Direction } from './components/Direction';
import { Item, Tree, TSide } from '../../utils/tree';
import { ComponentType } from '../../utils/componentTypes';

type TreeContextValue = {
  add: (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => void;
};

export const TreeContext = React.createContext({} as TreeContextValue);

const { Provider } = TreeContext;

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

export const Constructor = () => {
  const treeRef = useRef(new Tree());
  const tree = treeRef.current;
  const [root, setRoot] = useState(treeRef.current.getValue());

  const add = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => {
    const fromId = e.dataTransfer.getData('fromId');

    makeElementVisible(fromId);

    if (fromId === toId) {
      return;
    }
    if (!fromId) {
      return addNew(e, toId, side);
    }

    const { removedItem, lastComponentId, removedContainerId } = tree.remove(
      fromId,
    );

    if (removedItem) {
      tree.add(
        removedItem,
        removedContainerId === toId ? lastComponentId : toId,
        side,
      );
      setRoot(tree.getValue());
    }
  };

  const addNew = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => {
    const type = e.dataTransfer.getData('newItemType');
    if (!type) {
      const fromId = e.dataTransfer.getData('fromId');
      makeElementVisible(fromId);
      return;
    }
    tree.add(new Item(type as ComponentType), toId, side);
    setRoot(tree.getValue());
  };

  const remove = (id: string) => {
    if (id) {
      tree.remove(id);
      setRoot(tree.getValue());
    }
  };

  return (
    <Provider value={{ add }}>
      <ConstructorScreen>
        <DroppableContent
          id="droppable-content"
          onDragOver={(e) => e.preventDefault()}
          onDrop={addNew}
        >
          <Direction direction={root.direction} components={root.components} />
        </DroppableContent>
        <Footer
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => remove(e.dataTransfer.getData('fromId'))}
        >
          <Catalog />
        </Footer>
      </ConstructorScreen>
    </Provider>
  );
};

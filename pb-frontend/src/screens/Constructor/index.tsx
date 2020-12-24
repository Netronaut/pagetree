import React, { useRef, useState } from 'react';
import './styles.scss';

import Catalog from './components/Catalog';

import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { Direction } from './components/Direction';
import { InsertTo } from './components/Container/componentsStyles';
import { Tree, Item } from '../../utils/tree';

export const TreeContext = React.createContext({} as any);

const { Provider } = TreeContext;

export const Constructor = () => {
  const treeRef = useRef(new Tree());
  const tree = treeRef.current;
  const [root, setRoot] = useState(treeRef.current.getValue());

  const add = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: InsertTo,
  ) => {
    const fromId = e.dataTransfer.getData('fromId');
    if (fromId === toId) {
      return;
    }
    if (!fromId) {
      return addNew(e, toId, side);
    }

    const removedItem = tree.remove(fromId);
    if (removedItem) {
      tree.add(removedItem, toId, side);
      setRoot(tree.getValue());
    }
  };

  const addNew = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: InsertTo,
  ) => {
    const type = e.dataTransfer.getData('newItemType');
    tree.add(new Item({ type }), toId, side);
    setRoot(tree.getValue());
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
        <Footer onDragOver={(e) => e.preventDefault()}>
          <Catalog />
        </Footer>
      </ConstructorScreen>
    </Provider>
  );
};

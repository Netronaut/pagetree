import React, { useEffect, useRef, useState } from 'react';

import Catalog from './components/Catalog';

import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { useParams } from 'react-router-dom';
import { Direction } from './components/Direction';
import { Item, Tree, TSide } from '../../utils/tree';
import { ComponentType } from '../../utils/componentTypes';
import usePages from '../Pages/hooks/usePages';
import { usePrevious } from '../../hooks/usePrevious';

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

export const Constructor: React.FC = () => {
  const location = useParams<{ id: string }>();
  const _id = location.id;

  const { changePage, page } = usePages(_id);
  const prevPage = usePrevious(page);

  const treeRef = useRef(new Tree(page?.structure));
  const tree = treeRef.current;

  const [root, setRoot] = useState(tree.getValue());

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    changePage({ _id, structure: root });
  }, [root]);

  useEffect(() => {
    if (!prevPage && page) {
      treeRef.current = new Tree(page.structure);
      setRoot(treeRef.current.getValue());
    }
  }, [page]);

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
    tree.add(new Item({ type } as { type: ComponentType }), toId, side);
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

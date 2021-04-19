import React, { useState } from 'react';
import { Catalog } from './components/Catalog';
import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { Direction } from './components/Direction';
import { AddComponents } from './components/AddComponents';
import { Item, Tree, TSide } from './utils/tree';
import { Optional } from './types/helpers';
import { TPage } from './types';
import { TreeContext } from './utils/context';
import { Components } from './hocs/createCatalogComponent';

export * from './hocs/createCatalogComponent';

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

type Props = {
  pageContent: TPage;
  onChange: (val: TPage) => void;
  showPreview?: boolean;
  components?: Components;
};

export const Builder: React.FC<Props> = ({
  pageContent,
  onChange,
  showPreview,
  components,
}) => {
  const setValue = (newValue: Optional<TPage>) => {
    onChange({ ...pageContent, ...newValue });
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

    const tree = new Tree(pageContent.structure);

    tree.add(new Item({ type } as { type: string }), toId, side);
    setValue({ structure: tree.getValue() });
  };

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

    const tree = new Tree(pageContent.structure);

    const { removedItem, lastComponentId, removedContainerId } = tree.remove(
      fromId,
    );

    if (removedItem) {
      tree.add(
        removedItem,
        removedContainerId === toId ? lastComponentId : toId,
        side,
      );
      setValue({ structure: tree.getValue() });
    }
  };

  const onConfigChange = (id: string, field: string, newValue: string) => {
    if (pageContent) {
      setValue({
        config: {
          ...(pageContent.config || {}),
          [id]: {
            ...(pageContent.config?.[id] || {}),
            [field]: newValue,
          },
        },
      });
    }
  };

  const remove = (id: string) => {
    if (id) {
      const tree = new Tree(pageContent.structure);
      tree.remove(id);
      setValue({ structure: tree.getValue() });
    }
  };

  const content = !!pageContent.structure ? (
    <Direction
      direction={pageContent.structure.direction}
      components={pageContent.structure.components}
    />
  ) : null;

  const [isTheComponentsWindowOpen, setIsTheComponentsWindowOpen] = useState(false);

  return (
    <TreeContext.Provider
      value={{
        add,
        onConfigChange,
        config: pageContent.config,
        showPreview,
        components,
      }}
    >
      <ConstructorScreen>
        {showPreview ? (
          content
        ) : (
          <>
            <DroppableContent
              id="droppable-content"
              onDragOver={e => e.preventDefault()}
              onDrop={addNew}
            >
              {content}
            </DroppableContent>
            <Footer
              onDragOver={e => e.preventDefault()}
              onDrop={e => remove(e.dataTransfer.getData('fromId'))}
            >
              <Catalog components={components} />
            </Footer>
            <AddComponents
              isOpen={isTheComponentsWindowOpen}
              setIsOpen={setIsTheComponentsWindowOpen}
            />
          </>
        )}
      </ConstructorScreen>
    </TreeContext.Provider>
  );
};

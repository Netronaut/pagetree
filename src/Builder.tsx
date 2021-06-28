import React, { ReactElement } from 'react';
import { ConstructorScreen, DroppableContent } from './componentsStyles';
import { Direction } from './components/Direction';
import { AddComponents } from './components/AddComponents';
import { Item, Tree, TSide } from './utils/tree';
import { Optional } from './types/helpers';
import { TPage } from './types';
import { TreeContext } from './utils/context';
import { Components } from './hocs/createCatalogComponent';
import { Catalog } from './components/Catalog';
import { useModal } from './hooks';

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

export interface BuilderProps {
  pageContent: TPage;
  onChange: (val: TPage) => void;
  showPreview?: boolean;
  components?: Components;
  componentGroups?: Array<string>;
}

export const Builder = ({
  pageContent,
  onChange,
  showPreview,
  components,
  componentGroups,
}: BuilderProps): ReactElement | null => {
  const setValue = (newValue: Optional<TPage>) => {
    onChange({ ...pageContent, ...newValue });
  };

  const { isModalShown, onModalShow, onModalClose } = useModal();

  const addNew = (e: React.DragEvent<HTMLDivElement>, toId?: string, side?: TSide) => {
    const type = e.dataTransfer.getData('newItemType');
    if (!type) {
      const fromId = e.dataTransfer.getData('fromId');
      makeElementVisible(fromId);
      return;
    }

    const tree = new Tree(pageContent.structure);

    tree.add(new Item({ type } as { type: string }), toId, side);
    setValue({ structure: tree.getValue() });
    onModalClose();
  };

  const add = (e: React.DragEvent<HTMLDivElement>, toId?: string, side?: TSide) => {
    const fromId = e.dataTransfer.getData('fromId');

    makeElementVisible(fromId);

    if (fromId === toId) {
      return;
    }
    if (!fromId) {
      return addNew(e, toId, side);
    }

    const tree = new Tree(pageContent.structure);

    const { removedItem, lastComponentId, removedContainerId } = tree.remove(fromId);

    if (removedItem) {
      tree.add(removedItem, removedContainerId === toId ? lastComponentId : toId, side);
      setValue({ structure: tree.getValue() });
    }
  };

  const onConfigChange = (
    id: string,
    field: string,
    newValue: string,
    userControlledId?: string,
  ) => {
    if (pageContent) {
      setValue({
        config: {
          ...(pageContent.config || {}),
          [id]: {
            ...(pageContent.config?.[id] || {}),
            [field]: newValue,
            userControlledId: userControlledId ?? '',
          },
        },
      });
    }
  };

  const content = pageContent.structure ? (
    <Direction
      direction={pageContent.structure.direction}
      components={pageContent.structure.components}
    />
  ) : null;

  return (
    <TreeContext.Provider
      value={{
        add,
        onConfigChange,
        config: pageContent.config,
        showPreview,
        components,
        componentGroups,
      }}
    >
      <ConstructorScreen>
        {showPreview ? (
          content
        ) : (
          <>
            <DroppableContent
              id="droppable-content"
              onDragOver={(e) => e.preventDefault()}
              onDrop={addNew}
            >
              {content}
            </DroppableContent>
            {isModalShown ? (
              <Catalog onModalClose={onModalClose} />
            ) : (
              <AddComponents onModalShow={onModalShow} />
            )}
          </>
        )}
      </ConstructorScreen>
    </TreeContext.Provider>
  );
};

import React, { useState } from 'react';
import {
  ConstructorScreen,
  DroppableContent,
} from './componentsStyles';
import { Direction } from './components/Direction';
import { AddComponents } from './components/AddComponents';
import { Modal } from './components/Modal';
import { ModalButton, ModalH2, SearchBox } from './components/Modal/componentsStyles';
import { Item, Tree, TSide } from './utils/tree';
import { Optional } from './types/helpers';
import { TPage } from './types';
import { TreeContext } from './utils/context';
import { Components, ComponentGroups } from './hocs/createCatalogComponent';
import { CatalogItem } from './components/CatalogItem';

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
  componentGroups?: ComponentGroups;
};

export const Builder: React.FC<Props> = ({
  pageContent,
  onChange,
  showPreview,
  components,
  componentGroups,
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

  const [isOpen, setIsOpen] = useState(false);

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
            {isOpen
              ?
              <Modal onOpenClose={setIsOpen} isAddComponents>
                <ModalH2>Components</ModalH2>
                <SearchBox>
                  <input type="text" placeholder="Search" />
                  <ModalButton><img src="search.7845d0e5.svg" alt="search" /></ModalButton>
                </SearchBox>
                {componentGroups?.map(group =>
                  <CatalogItem key={group.name} group={group} />
                )}
              </Modal>
              :
              <AddComponents
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            }
          </>
        )}
      </ConstructorScreen>
    </TreeContext.Provider>
  );
};

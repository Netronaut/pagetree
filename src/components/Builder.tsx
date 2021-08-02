import React, { ReactElement, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { Direction } from './Direction';
import { Catalog } from './Catalog';
import { AddComponents } from './AddComponents';
import { RemoveDropArea } from './RemoveDropArea';
import { Item, Tree, TSide, TreeContext } from '../utils';
import { Optional, PageStructure } from '../types';
import { useModal } from '../hooks';
import { Components } from '../hocs';
import { ConstructorScreen, DroppableContent } from './components.styles';

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

export interface BuilderProps {
  pageContent?: PageStructure;
  onChange: (val: PageStructure) => void;
  showPreview?: boolean;
  components?: Components;
  componentGroups?: Array<string>;
}

export const Builder = ({
  pageContent = { _id: nanoid(6) },
  onChange,
  showPreview,
  components,
  componentGroups,
}: BuilderProps): ReactElement => {
  pageContent = useMemo(
    () => (pageContent === null ? { _id: nanoid(6) } : pageContent),
    [pageContent],
  );

  const setValue = (newValue: Optional<PageStructure>) => {
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
  };

  const remove = (e: React.DragEvent<HTMLDivElement>) => {
    const fromId = e.dataTransfer.getData('fromId');
    const tree = new Tree(pageContent.structure);
    tree.remove(fromId);
    setValue({ structure: tree.getValue() });
  };

  const [searchValue, setSearchValue] = useState('');
  const [openedGroup, setOpenedGroup] = useState('');

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
              <Catalog
                onModalClose={onModalClose}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                openedGroup={openedGroup}
                setOpenedGroup={setOpenedGroup}
              />
            ) : (
              <>
                <AddComponents onModalShow={onModalShow} />
                <RemoveDropArea onDrop={remove} />
              </>
            )}
          </>
        )}
      </ConstructorScreen>
    </TreeContext.Provider>
  );
};

import React, { ReactElement, useState } from 'react';
import { Direction } from './Direction';
import { Catalog, CatalogComponent } from './Catalog';
import { AddComponents } from './AddComponents';
import { RemoveDropArea } from './RemoveDropArea';
import { Item, Tree, TreeContext, TSide } from './PageTree';
import { PageContent } from '../types';
import { useModal } from '../hooks';
import { ConstructorScreen, DroppableContent } from './components.styles';

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

export interface PageCanvasProps {
  pageContent?: PageContent;
  onChange: (val: PageContent) => void;
  showPreview?: boolean;
  components?: Array<CatalogComponent>;
}

export const PageCanvas = ({
  pageContent = {},
  onChange,
  showPreview,
  components,
}: PageCanvasProps): ReactElement => {
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
    onChange({ ...pageContent, structure: tree.getValue() });
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
      onChange({ ...pageContent, structure: tree.getValue() });
    }
  };

  const onConfigChange = (
    id: string,
    field: string,
    newValue: string,
    userControlledId?: string,
  ) => {
    onChange({
      ...pageContent,
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
    onChange({ ...pageContent, structure: tree.getValue() });
  };

  const [searchValue, setSearchValue] = useState('');
  const [openedGroup, setOpenedGroup] = useState('');

  const structure = pageContent.structure && (
    <Direction
      direction={pageContent.structure.direction}
      components={pageContent.structure.components}
    />
  );

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
          structure
        ) : (
          <>
            <DroppableContent
              id="droppable-content"
              onDragOver={(e) => e.preventDefault()}
              onDrop={addNew}
            >
              {structure}
            </DroppableContent>
            {isModalShown ? (
              <Catalog
                components={components}
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

import React from 'react';
import { Catalog } from './components/Catalog';
import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { Direction } from './components/Direction';
import { Item, Tree, TSide } from './utils/tree';
import { Optional } from './types/helpers';
import { TPage } from './types';
import { TreeContext } from './utils/context';
import { Components } from './hocs/createCatalogComponent';

export * from './hocs/createCatalogComponent';

const { Provider } = TreeContext;

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

type Props = {
  value: TPage;
  onChange: (val: TPage) => void;
  production?: boolean;
  components?: Components;
};

export const Builder: React.FC<Props> = ({
  value,
  onChange,
  production,
  components,
}) => {
  const setValue = (newValue: Optional<TPage>) => {
    onChange({ ...value, ...newValue });
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

    const tree = new Tree(value.structure);

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

    const tree = new Tree(value.structure);

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
    if (value) {
      setValue({
        config: {
          ...(value.config || {}),
          [id]: {
            ...(value.config?.[id] || {}),
            [field]: newValue,
          },
        },
      });
    }
  };

  const remove = (id: string) => {
    if (id) {
      const tree = new Tree(value.structure);
      tree.remove(id);
      setValue({ structure: tree.getValue() });
    }
  };

  const content = !!value.structure ? (
    <Direction
      direction={value.structure.direction}
      components={value.structure.components}
    />
  ) : null;

  return (
    <Provider
      value={{
        add,
        onConfigChange,
        config: value.config,
        production,
        components,
      }}
    >
      <ConstructorScreen>
        {production ? (
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
          </>
        )}
      </ConstructorScreen>
    </Provider>
  );
};

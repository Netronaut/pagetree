import React, { useState } from 'react';
import { v4 } from 'uuid';
import './styles.scss';

import Catalog from './components/Catalog';
import Content from './components/Content';
import { Component, ComponentType } from './types';

import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';

export const Constructor = () => {
  const [arr, setArr] = useState<Component[]>([]);

  const addContent = (index: number, isBefore?: boolean) => (item: string) => {
    const oldIndex = arr.findIndex(({ id }) => id === item);
    if (index !== oldIndex) {
      const newArr = [...arr];
      if (oldIndex >= 0) {
        const removedItems = newArr.splice(oldIndex, 1);
        newArr.splice(
          index > oldIndex || isBefore ? index : index + 1,
          0,
          removedItems[0],
        );
      } else {
        newArr.splice(isBefore ? index : index + 1, 0, {
          text: `${item} ${newArr.length + 1}`,
          id: v4(),
          type: item as ComponentType,
        });
      }
      setArr(newArr);
    }
  };

  const addComponent = (e: React.DragEvent<HTMLDivElement>) => {
    const itemId: string = e.dataTransfer.getData('itemId');
    if (['text'].includes(itemId)) {
      setArr((prev) => [
        ...prev,
        {
          text: `${itemId} ${prev.length + 1}`,
          id: v4(),
          type: itemId as ComponentType,
        },
      ]);
    }
  };

  const deleteComponent = (e: React.DragEvent<HTMLDivElement>) => {
    const itemId: string = e.dataTransfer.getData('itemId');
    setArr((prev) => {
      return prev.filter(({ id }) => id !== itemId);
    });
  };

  const onContentDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onFooterDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <ConstructorScreen>
      <DroppableContent
        id="droppable-content"
        onDrop={addComponent}
        onDragOver={onContentDragOver}
      >
        <Content content={arr} addContent={addContent} />
      </DroppableContent>
      <Footer onDrop={deleteComponent} onDragOver={onFooterDragOver}>
        <Catalog />
      </Footer>
    </ConstructorScreen>
  );
};

import React from 'react';
import { Component } from '../../types';

export type DroppableComponent = React.ComponentType<DroppableComponentProps>;

type ContainerProps = {
  Component: DroppableComponent;
  id: string;
  element: Component;
  addBefore: (item: string) => void;
  addAfter: (item: string) => void;
};

type DroppableComponentProps = {
  element: Component;
};

const Container: React.FC<ContainerProps> = ({
  Component,
  id,
  element,
  addBefore,
  addAfter,
}) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('itemId', e.currentTarget.id);

    const itemView = document.getElementById(element.type);
    if (itemView) {
      e.dataTransfer.setDragImage(itemView, 0, 0);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const itemView = document.getElementById(element.type);
    if (itemView) {
      const height = itemView.getBoundingClientRect().height;
      const y = e.pageY - e.currentTarget.getBoundingClientRect().top;
      if (height / 2 > y) {
        e.currentTarget.setAttribute('class', 'separator top hover');
      } else {
        e.currentTarget.setAttribute('class', 'separator bottom hover');
      }
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setAttribute('class', 'separator hide');

    const item = e.dataTransfer.getData('itemId');
    const height = e.currentTarget.getBoundingClientRect().height;
    const y = e.pageY - e.currentTarget.getBoundingClientRect().top;
    if (height / 2 > y) {
      addBefore(item);
    } else addAfter(item);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.setAttribute('class', 'separator hide');
  };

  return (
    <div
      id={id}
      style={{ position: 'relative' }}
      {...{ draggable: true, onDragOver, onDragLeave, onDragStart, onDrop }}
    >
      <Component element={element} />
    </div>
  );
};

export default Container;

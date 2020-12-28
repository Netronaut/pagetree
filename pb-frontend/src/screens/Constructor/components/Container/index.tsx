import React, { useContext, useState } from 'react';
import { Component } from '../../types';
import { Indicator, InsertTo, MainContainer } from './componentsStyles';
import { TreeContext } from '../../index';

export type DroppableComponent = React.ComponentType<DroppableComponentProps>;

type ContainerProps = {
  Component: DroppableComponent;
  id: string;
  element: Component;
};

type DroppableComponentProps = {
  element: Component;
};

const getInsertion = ({ x, y, width, height }: Record<string, number>) => {
  if (x < 20) {
    return InsertTo.left;
  }
  if (width - 20 < x) {
    return InsertTo.right;
  }
  if (y < height / 2) {
    return InsertTo.top;
  }
  if (y > height / 2) {
    return InsertTo.bottom;
  }

  return InsertTo.undetermined;
};

const Container: React.FC<ContainerProps> = ({ Component, id, element }) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<InsertTo>(InsertTo.undetermined);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('fromId', id);

    const itemView = document.getElementById(element.type);
    if (itemView) {
      e.dataTransfer.setDragImage(itemView, 0, 0);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      height,
      width,
      top,
      left,
    } = e.currentTarget.getBoundingClientRect();

    const y = e.pageY - top;
    const x = e.pageX - left;

    const newInsertTo = getInsertion({ x, y, width, height });

    if (newInsertTo !== insertTo) {
      setInsertTo(newInsertTo);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    add(e, id, insertTo);

    setInsertTo(InsertTo.undetermined);
  };

  const onDragLeave = () => {
    setInsertTo(InsertTo.undetermined);
  };

  return (
    <MainContainer
      {...{
        draggable: true,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
      }}
    >
      <Indicator position={insertTo} />
      <Component element={element} />
    </MainContainer>
  );
};

export default Container;

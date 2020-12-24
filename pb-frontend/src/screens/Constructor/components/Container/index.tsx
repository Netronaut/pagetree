import React, { useContext, useState } from 'react';
import { Component } from '../../types';
import { Indicator, InsertTo, MainContainer } from './componentsStyles';
import { TreeContext } from '../../index';

export type DroppableComponent = React.ComponentType<DroppableComponentProps>;

type ContainerProps = {
  Component: DroppableComponent;
  id: string;
  element: Component;
  path: number[];
  parentDirection: 'row' | 'column';
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

const Container: React.FC<ContainerProps> = ({
  Component,
  id,
  element,
  path,
  parentDirection,
}) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<InsertTo>(InsertTo.undetermined);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('pathFrom', path.join('-'));

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

    console.log('parentDirection ==>', parentDirection);
    let pathTo;
    if (parentDirection === 'column') {
      if (insertTo === InsertTo.top) {
        pathTo = path;
      }
      if (insertTo === InsertTo.bottom) {
        pathTo = path.map((pathNumber, i) =>
          i === path.length - 1 ? pathNumber + 1 : pathNumber,
        );
      }
      if (insertTo === InsertTo.left) {
        pathTo = path.concat([0]);
      }
      if (insertTo === InsertTo.right) {
        pathTo = path.concat([1]);
      }
    }
    if (parentDirection === 'row') {
      if (insertTo === InsertTo.left) {
        pathTo = path;
      }
      if (insertTo === InsertTo.right) {
        pathTo = path.map((pathNumber, i) =>
          i === path.length - 1 ? pathNumber + 1 : pathNumber,
        );
      }
      if (insertTo === InsertTo.top) {
        pathTo = path.concat([0]);
      }
      if (insertTo === InsertTo.bottom) {
        pathTo = path.concat([1]);
      }
    }

    add(pathTo, e);

    setInsertTo(InsertTo.undetermined);
  };

  const onDragLeave = () => {
    setInsertTo(InsertTo.undetermined);
  };

  return (
    <MainContainer
      {...{
        draggable: true,
        resizable: true,
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

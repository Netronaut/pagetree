import * as React from 'react';
import { Component } from '../../index';
import { ChangeEvent } from 'react';
import { useDraggable } from '../../hooks/useDraggable';

type GridProps = {
  key: string;
  element: Component;
};

const GridComponent = ({ key, element }: GridProps) => {
  const { draggableProps } = useDraggable();

  return (
    <div
      className="component-container"
      id={element.id}
      key={key}
      {...draggableProps}
    />
  );
};

export default GridComponent;

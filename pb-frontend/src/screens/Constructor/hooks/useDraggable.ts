import { useRef } from 'react';
import * as React from 'react';

export const useDraggable = () => {
  const x = useRef(0);
  const y = useRef(0);
  const width = useRef(0);
  const height = useRef(0);

  const onComponentMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    width.current = e.currentTarget.getBoundingClientRect().width;
    height.current = e.currentTarget.getBoundingClientRect().height;
    x.current = e.pageX - e.currentTarget.getBoundingClientRect().left;
    y.current = e.pageY - e.currentTarget.getBoundingClientRect().top;
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('itemId', event.currentTarget.id);
  };

  return {
    x: x.current,
    y: y.current,
    width: width.current,
    height: height.current,
    draggableProps: { draggable: true, onComponentMouseDown, onDragStart },
  };
};

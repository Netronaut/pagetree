import React, { DragEventHandler, useContext } from 'react';
import { PageTreeDispatchContext, PageTreeStateContext } from './provider';
import { DragOverState, InsertionPoint } from './types';

const getInsertionPoint = ({ x, y, width, height }: Record<string, number>): InsertionPoint => {
  if (x < width * 0.25) {
    return InsertionPoint.Left;
  }
  if (width * 0.75 < x) {
    return InsertionPoint.Right;
  }
  if (y < height * 0.5) {
    return InsertionPoint.Top;
  }
  if (y >= height * 0.5) {
    return InsertionPoint.Bottom;
  }
  return InsertionPoint.None;
};

export interface UseDragReturnType {
  draggable: boolean;
  dragOver?: DragOverState;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

export interface UseDropReturnType {
  dragOver?: DragOverState;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: DragEventHandler;
}

export interface UseDropRemoveReturnType {
  onDrop: DragEventHandler;
}

export const useDrag = (): UseDragReturnType => {
  const dispatch = useContext(PageTreeDispatchContext);
  const { dragOver } = useContext(PageTreeStateContext);

  function onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    const { componentDescription } = event.currentTarget.dataset;
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        componentDescription: componentDescription ? JSON.parse(componentDescription) : null,
        sourceId: event.currentTarget.getAttribute('id'),
      }),
    );
  }

  function onDragEnd() {
    dispatch({ type: 'dragOver' });
  }

  return {
    draggable: true,
    dragOver,
    onDragStart,
    onDragEnd,
  };
};

export const useDrop = (): UseDropReturnType => {
  const dispatch = useContext(PageTreeDispatchContext);
  const { dragOver } = useContext(PageTreeStateContext);

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('id') || undefined;
    const { height, width, top, left } = event.currentTarget.getBoundingClientRect();
    const insertionPoint = getInsertionPoint({
      x: event.pageX - left,
      y: event.pageY - top,
      width,
      height,
    });

    dispatch({
      type: 'dragOver',
      payload: {
        targetId,
        insertionPoint,
      },
    });
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    dispatch({ type: 'dragOver' });
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('id');
    const { height, width, top, left } = event.currentTarget.getBoundingClientRect();
    const insertionPoint = getInsertionPoint({
      x: event.clientX + window.scrollX - left,
      y: event.clientY + window.scrollY - top,
      width,
      height,
    });

    const dataTransfer = event.dataTransfer.getData('text/plain');
    if (dataTransfer) {
      dispatch({
        type: 'drop',
        payload: { data: JSON.parse(dataTransfer), targetId, insertionPoint },
      });
    }
  }

  return {
    dragOver,
    onDragOver,
    onDragLeave,
    onDrop,
  };
};

export const onDropRemove = (): UseDropRemoveReturnType => {
  const dispatch = useContext(PageTreeDispatchContext);

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();

    const dataTransfer = event.dataTransfer.getData('text/plain');
    if (dataTransfer) {
      dispatch({
        type: 'remove',
        payload: { data: JSON.parse(dataTransfer) },
      });
    }
  }

  return {
    onDrop,
  };
};

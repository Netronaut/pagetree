import React, { DragEventHandler, useContext } from 'react';
import { PageTreeDispatchContext, PageTreeStateContext } from './provider';
import { DataTransferPayload, DragOverPayload, InsertionPoint } from './types';

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
  dataTransfer?: DataTransferPayload;
  dragOver?: DragOverPayload;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

export interface UseDropReturnType {
  dataTransfer?: DataTransferPayload;
  dragOver?: DragOverPayload;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: DragEventHandler;
}

export interface UseDropRemoveReturnType {
  onDrop: DragEventHandler;
}

export const useDrag = (): UseDragReturnType => {
  const dispatch = useContext(PageTreeDispatchContext);
  const { dragOver, dataTransfer } = useContext(PageTreeStateContext);

  function onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    const { componentDescription } = event.currentTarget.dataset;
    const data = {
      componentDescription: componentDescription ? JSON.parse(componentDescription) : null,
      sourceId: event.currentTarget.getAttribute('id') || undefined,
    };
    dispatch({ type: 'dataTransfer', payload: data });
  }

  function onDragEnd() {
    dispatch({ type: 'dragEnd' });
  }

  return {
    draggable: true,
    dataTransfer,
    dragOver,
    onDragStart,
    onDragEnd,
  };
};

export const useDrop = (): UseDropReturnType => {
  const dispatch = useContext(PageTreeDispatchContext);
  const { dragOver, dataTransfer } = useContext(PageTreeStateContext);

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
    setTimeout(
      () =>
        dispatch({
          type: 'dragLeave',
          payload: {
            sourceId: event.currentTarget?.getAttribute('id') || undefined,
          },
        }),
      60,
    );
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

    dispatch({
      type: 'drop',
      payload: { targetId, insertionPoint },
    });
    dispatch({ type: 'dragEnd' });
  }

  return {
    dragOver,
    dataTransfer,
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
    dispatch({ type: 'remove' });
    dispatch({ type: 'dragEnd' });
  }

  return {
    onDrop,
  };
};

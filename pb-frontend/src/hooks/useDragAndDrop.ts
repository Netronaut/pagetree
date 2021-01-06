import React, { useContext, useState } from 'react';
import { TreeContext } from '../screens/Constructor';
import { TSide } from '../utils/tree';
import { componentTypes } from '../utils/componentTypes';

const getInsertion = ({ x, y, width, height }: Record<string, number>) => {
  if (x < 20) {
    return TSide.left;
  }
  if (width - 20 < x) {
    return TSide.right;
  }
  if (y < height / 2) {
    return TSide.top;
  }
  if (y >= height / 2) {
    return TSide.bottom;
  }

  return TSide.undetermined;
};

export const useDragAndDrop = (id?: string) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<TSide>(TSide.undetermined);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const itemId = e.currentTarget.id;
    const isNew = componentTypes.includes(itemId);

    e.dataTransfer.setData(isNew ? 'newItemType' : 'fromId', itemId);

    const clone =
      document.getElementById('ghostDiv') || document.createElement('div');

    const itemView = document.getElementById(itemId);

    if (!isNew && itemView) {
      const { width, height } = itemView.getBoundingClientRect();
      clone.innerHTML = itemView.innerHTML;
      clone.className = itemView.className;
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.position = `fixed`;
      if (!clone.id) {
        clone.id = 'ghostDiv';
        document.body.appendChild(clone);
      }
      itemView.style.opacity = '0';
    }

    if (itemView) {
      e.dataTransfer.setDragImage(isNew ? itemView : clone, 0, 0);
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
    const itemId = e.dataTransfer.getData('fromId');

    if (itemId) {
      const draggedItem = document.getElementById(itemId);
      if (draggedItem) {
        draggedItem.style.opacity = '1';
      }
    }

    e.stopPropagation();
    add(e, id, insertTo);

    setInsertTo(TSide.undetermined);
  };

  const onDragLeave = () => {
    setTimeout(() => {
      if (insertTo !== TSide.undetermined) {
        setInsertTo(TSide.undetermined);
      }
    }, 10);
  };

  return {
    onDragLeave,
    onDragStart,
    onDragOver,
    onDrop,
    insertTo,
  };
};

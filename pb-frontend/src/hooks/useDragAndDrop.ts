import React, { useContext, useState } from 'react';
import { TreeContext } from '../screens/Constructor';
import { sidesByDirection, TDirection, TSide } from '../utils/tree';

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
  if (y > height / 2) {
    return TSide.bottom;
  }

  return TSide.undetermined;
};

type DragAndDropProps = {
  direction?: TDirection;
  id?: string;
};

export const useDragAndDrop = ({ direction, id }: DragAndDropProps) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<TSide>(TSide.undetermined);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(direction, id, e);
    e.dataTransfer.setData(
      e.currentTarget.id ? 'newItemType' : 'fromId',
      id ? id : e.currentTarget.id,
    );
    const itemView = document.getElementById(
      e.currentTarget.id ? e.currentTarget.id : 'text',
    );
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
      if (direction && !sidesByDirection[direction].includes(newInsertTo)) {
        setInsertTo(newInsertTo);
      } else setInsertTo(newInsertTo);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    add(e, id, insertTo);

    setInsertTo(TSide.undetermined);
  };

  const onDragLeave = () => {
    setInsertTo(TSide.undetermined);
  };

  return {
    onDragLeave,
    onDragStart,
    onDragOver,
    onDrop,
    insertTo,
  };
};

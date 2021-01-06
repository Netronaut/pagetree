import { InsertTo } from '../screens/Constructor/components/Container/componentsStyles';
import React, { useContext, useState } from 'react';
import { TreeContext } from '../screens/Constructor';

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

const sidesForDirections = {
  column: ['top', 'bottom'],
  row: ['left', 'right'],
};

type DragAndDropProps = {
  direction?: 'row' | 'column';
  id?: string;
};

const useDragAndDrop = ({ direction, id }: DragAndDropProps) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<InsertTo>(InsertTo.undetermined);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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
      if (direction && !sidesForDirections[direction].includes(newInsertTo)) {
        setInsertTo(newInsertTo);
      } else setInsertTo(newInsertTo);
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

  return {
    onDragLeave,
    onDragStart,
    onDragOver,
    onDrop,
    insertTo,
  };
};

export default useDragAndDrop;

import React, { useContext, useState } from 'react';
import { Component, ComponentByType } from '../../types';
import Container from '../Container';
import { Indicator, InsertTo } from '../Container/componentsStyles';
import { TreeContext } from '../../index';
import { DirectionWrapper } from './componentsStyles';

type Props = {
  direction: 'row' | 'column';
  components: Array<any>;
  id?: string;
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

const sidesForDirections = {
  column: ['top', 'bottom'],
  row: ['left', 'right'],
};

export const Direction: React.FC<Props> = ({ direction, components, id }) => {
  const { add } = useContext(TreeContext);
  const [insertTo, setInsertTo] = useState<InsertTo>(InsertTo.undetermined);

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

    if (
      newInsertTo !== insertTo &&
      !sidesForDirections[direction].includes(newInsertTo)
    ) {
      setInsertTo(newInsertTo);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('onDrop');
    add(e, id, insertTo);

    setInsertTo(InsertTo.undetermined);
  };

  const onDragLeave = () => {
    setInsertTo(InsertTo.undetermined);
  };

  return (
    <DirectionWrapper
      direction={direction}
      style={{ flexDirection: direction, flexGrow: 1 }}
      {...{
        onDragLeave,
        onDragOver,
        onDrop,
      }}
    >
      <Indicator position={insertTo} />

      {components.map((component, index) => {
        if (component.direction) {
          return (
            <Direction
              key={component.id}
              components={component.components}
              direction={component.direction}
              id={component.id}
            />
          );
        }
        const Component = ComponentByType[component.type as 'text'];
        return (
          <Container
            id={component.id}
            key={component.id}
            element={component}
            Component={ComponentByType[component.type as 'text']}
          >
            <Component element={component} />
          </Container>
        );
      })}
    </DirectionWrapper>
  );
};

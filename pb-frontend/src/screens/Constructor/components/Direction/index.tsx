import React from 'react';
import { Component, ComponentByType } from '../../types';
import Container from '../Container';
import { Indicator } from '../Container/componentsStyles';
import { DirectionWrapper } from './componentsStyles';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

type Props = {
  direction: 'row' | 'column';
  components: Array<any>;
  id?: string;
};

export const Direction: React.FC<Props> = ({ direction, components, id }) => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop({
    direction,
    id,
  });

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
      {components.map((component) => {
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

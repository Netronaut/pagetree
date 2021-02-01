import React from 'react';
import { ComponentRenderer } from '../ComponentRenderer';
import { Indicator } from '../ComponentRenderer/componentsStyles';
import { DirectionWrapper } from './componentsStyles';
import { useDragAndDrop } from 'hooks/useDragAndDrop';
import { ChildDirection } from 'utils/tree';

export const Direction: React.FC<ChildDirection> = ({
  direction,
  components,
  id,
}) => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop(id);

  return (
    <DirectionWrapper
      direction={direction}
      {...(id
        ? {
            onDragLeave,
            onDragOver,
            onDrop,
          }
        : {})}
    >
      <Indicator position={insertTo} inDirection />
      {components.map((component) => {
        if (component.direction) {
          return <Direction key={component.id} {...component} />;
        }
        return <ComponentRenderer key={component.id} component={component} />;
      })}
    </DirectionWrapper>
  );
};

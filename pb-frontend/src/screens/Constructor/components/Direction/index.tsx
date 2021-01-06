import React from 'react';
import { ComponentRenderer } from '../ComponentRenderer';
import { Indicator } from '../ComponentRenderer/componentsStyles';
import { DirectionWrapper } from './componentsStyles';
import { useDragAndDrop } from 'src/hooks/useDragAndDrop';
import { TDirection } from 'src/utils/tree';

type Props = {
  direction: TDirection;
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
      {...(id
        ? {
            onDragLeave,
            onDragOver,
            onDrop,
          }
        : {})}
    >
      <Indicator position={insertTo} />
      {components.map((component) => {
        if (component.direction) {
          return <Direction key={component.id} {...component} />;
        }
        return <ComponentRenderer key={component.id} component={component} />;
      })}
    </DirectionWrapper>
  );
};

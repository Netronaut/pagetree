import React, { useContext, useEffect } from 'react';
import { ComponentRenderer } from '../ComponentRenderer';
import { Indicator } from '../ComponentRenderer/componentsStyles';
import { DirectionWrapper } from './componentsStyles';
import { ChildDirection } from '../../utils/tree';
import { usePrevious, useDragAndDrop } from '../../hooks';
import { TreeContext } from '../../utils/context';

const ratios: Record<number, string[]> = {
  2: ['2:1', '1:1', '1:2'],
  3: ['2:1:1', '1:1:1', '1:2:1', '1:1:2'],
  4: ['2:1:1:1', '1:1:1:1', '1:2:1:1', '1:1:2:1', '1:1:1:2'],
  5: [
    '2:1:1:1:1',
    '1:1:1:1:1',
    '1:2:1:1:1',
    '1:1:2:1:1',
    '1:1:1:2:1',
    '1:1:1:1:2',
  ],
  6: [
    '2:1:1:1:1:1',
    '1:1:1:1:1:1',
    '1:2:1:1:1:1',
    '1:1:2:1:1',
    '1:1:1:2:1:1',
    '1:1:1:1:2:1',
    '1:1:1:1:1:2',
  ],
};

export const Direction: React.FC<ChildDirection> = ({
  direction,
  components,
  id,
}) => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop(id);
  const { onConfigChange, config, showPreview } = useContext(TreeContext);

  const prevComponentsLength = usePrevious(components.length);

  useEffect(() => {
    if (direction === 'row' && prevComponentsLength !== components.length) {
      onConfigChange(
        id as string,
        'ratio',
        new Array(components.length).fill(1).join(':'),
      );
    }
  }, [components.length]);

  const onRatioSelect = (index: number) => {
    onConfigChange(id as string, 'ratio', ratios[components.length][index]);
  };

  return (
    <DirectionWrapper
      direction={direction}
      showPreview={showPreview}
      ratio={
        config?.[id as string]?.ratio ||
        new Array(components.length).fill(1).join(':')
      }
      {...(id
        ? {
            onDragLeave,
            onDragOver,
            onDrop,
          }
        : {})}
    >
      <Indicator position={insertTo} />
      {components.map((component, index) => {
        if (component.direction) {
          return <Direction key={component.id} {...component} />;
        }
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            direction={direction}
            ratios={ratios}
            onRatioSelect={onRatioSelect}
            lastIndex={components.length - 1 === index}
            componentsInTheRow={components.length}
          />
        );
      })}
    </DirectionWrapper>
  );
};

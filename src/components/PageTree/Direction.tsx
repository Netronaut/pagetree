import React, { ReactElement, useContext, useEffect } from 'react';
import { usePrevious, useDragAndDrop } from '../../hooks';
import { TreeContext } from './context';
import { PageTree } from './PageTree';
import { DirectionContainer, Indicator } from './PageTree.styles';
import { ChildDirection } from './PageTree.types';

const ratios: Record<number, string[]> = {
  2: ['2:1', '1:1', '1:2'],
  3: ['2:1:1', '1:1:1', '1:2:1', '1:1:2'],
  4: ['2:1:1:1', '1:1:1:1', '1:2:1:1', '1:1:2:1', '1:1:1:2'],
  5: ['2:1:1:1:1', '1:1:1:1:1', '1:2:1:1:1', '1:1:2:1:1', '1:1:1:2:1', '1:1:1:1:2'],
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

type DirectionProps = ChildDirection;

export const Direction = ({ direction, components, id }: DirectionProps): ReactElement => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop(id);
  const { onConfigChange, config, showPreview } = useContext(TreeContext);

  const prevComponentsLength = usePrevious(components.length);

  useEffect(() => {
    if (direction === 'row' && prevComponentsLength !== components.length) {
      onConfigChange(id as string, 'ratio', new Array(components.length).fill(1).join(':'));
    }
  }, [components.length]);

  const onRatioSelect = (index: number) => {
    onConfigChange(id as string, 'ratio', ratios[components.length][index]);
  };

  return (
    <DirectionContainer
      direction={direction}
      showPreview={showPreview}
      ratio={config?.[id as string]?.ratio || new Array(components.length).fill(1).join(':')}
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
          <PageTree
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
    </DirectionContainer>
  );
};

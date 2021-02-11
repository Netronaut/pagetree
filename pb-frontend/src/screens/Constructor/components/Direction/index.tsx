import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ComponentRenderer } from '../ComponentRenderer';
import {
  Configure,
  Indicator,
  Type,
  Ratios,
  Ratio,
} from '../ComponentRenderer/componentsStyles';
import { DirectionWrapper } from './componentsStyles';
import { useDragAndDrop } from 'hooks/useDragAndDrop';
import { ChildDirection } from 'utils/tree';
import { useModal, usePrevious } from '../../../../hooks';
import usePages from '../../../Pages/hooks/usePages';
import { TreeContext } from '../../index';
import { Modal } from '../Modal';

const ratios: Record<number, string[]> = {
  2: ['2:1', '1:1', '1:2'],
  3: ['2:1:1', '1:1:1', '1:2:1', '1:1:2'],
};

export const Direction: React.FC<ChildDirection> = ({
  direction,
  components,
  id,
}) => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop(id);
  const { modalShown, show, onModalClose } = useModal();
  const { onConfigChange } = useContext(TreeContext);
  const location = useParams<{ id: string }>();
  const _id = location.id;
  const { page } = usePages(_id);

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
      ratio={
        page?.config?.[id as string]?.ratio ||
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
      {modalShown && (
        <Modal onClose={onModalClose}>
          <Type>Row settings</Type>
          Possible ratios:
          <Ratios>
            {direction === 'row' &&
              components.length &&
              ratios[components.length]?.map((r: string, index: number) => {
                return (
                  <Ratio key={r} onClick={() => onRatioSelect(index)}>
                    {r}
                  </Ratio>
                );
              })}
          </Ratios>
        </Modal>
      )}
      {direction === 'row' && <Configure onClick={show}>...</Configure>}
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

import React, { useEffect, useState } from 'react';
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
import { useModal } from '../../../../hooks';
import { Modal } from '../Modal';

type Ratio = {
  title: string;
  value: string[];
};

const initialPossibleRatios: { [key: number]: Ratio[] } = {
  2: [
    {
      title: '1:1',
      value: ['50%', '50%'],
    },
    {
      title: '1:2',
      value: ['34%', '66%'],
    },
    {
      title: '2:1',
      value: ['66%', '34%'],
    },
  ],
  3: [
    {
      title: '1:1:1',
      value: [
        '33.333333333333336%',
        '33.333333333333336%',
        '33.333333333333336%',
      ],
    },
    {
      title: '1:2:1',
      value: ['25%', '50%', '25%'],
    },
    {
      title: '2:1:1',
      value: ['50%', '25%', '25%'],
    },
    {
      title: '1:1:2',
      value: ['25%', '25%', '50%'],
    },
  ],
};

export const Direction: React.FC<ChildDirection> = ({
  direction,
  components,
  id,
}) => {
  const { onDragLeave, onDragOver, insertTo, onDrop } = useDragAndDrop(id);
  const { modalShown, show, onModalClose } = useModal();

  const initialRatioValue = new Array(components.length).fill(
    `${100 / components.length}%`,
  );
  const initialRatio = [
    {
      title: new Array(components.length).fill(1).join(':'),
      value: initialRatioValue,
    },
  ];

  const [ratio, setRatio] = useState(initialRatioValue);
  const [possibleRatios, setPossibleRatios] = useState(initialPossibleRatios);

  useEffect(() => {
    if (direction === 'row') {
      setRatio(initialRatioValue);
      setPossibleRatios({
        [components.length]: initialRatio,
        ...possibleRatios,
      });
    }
  }, [components.length]);

  const onRatioSelect = (index: number) => {
    return setRatio(possibleRatios[components.length][index].value);
  };

  return (
    <DirectionWrapper
      direction={direction}
      ratio={ratio}
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
              possibleRatios[components.length]?.map(
                (r: Ratio, index: number) => {
                  return (
                    <Ratio key={r.title} onClick={() => onRatioSelect(index)}>
                      {r.title}
                    </Ratio>
                  );
                },
              )}
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

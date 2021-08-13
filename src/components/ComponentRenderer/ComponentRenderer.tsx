import React, { useContext, useMemo } from 'react';
import { useDragAndDrop, useModal } from '../../hooks';
import { ChildComponent, TreeContext } from '../../tree';
import { CatalogComponent } from '../Catalog';
import { Modal } from '../Modal';
import { Configure, Container, Indicator, Ratio, Ratios } from './ComponentRenderer.styles';

type Props = {
  component: ChildComponent;
  direction: string;
  ratios: Record<number, string[]>;
  onRatioSelect: (val: number) => void;
  lastIndex: boolean;
  componentsInTheRow: number;
};

export const ComponentRenderer: React.FC<Props> = ({
  component,
  direction,
  ratios,
  onRatioSelect,
  lastIndex,
  componentsInTheRow,
}) => {
  const { id, type } = component;
  const { onDragLeave, onDragStart, onDragOver, onDrop, insertTo } = useDragAndDrop(id);

  const { showPreview, components } = useContext(TreeContext);

  const componentByType = useMemo(() => {
    return (components || []).reduce((acc, component) => {
      acc[component.type] = component;
      return acc;
    }, {} as Record<string, CatalogComponent>);
  }, [components]);

  const Component = componentByType[type];

  if (showPreview) {
    return <Component id={id} type={type} />;
  }

  const { isModalShown, onModalShow, onModalClose } = useModal();

  const ModalCondition = isModalShown && (
    <Modal onClose={onModalClose}>
      Possible ratios:
      <Ratios>
        {direction === 'row' &&
          componentsInTheRow &&
          ratios[componentsInTheRow].map((r: string, index: number) => {
            return (
              <Ratio key={r} onClick={() => onRatioSelect(index)}>
                {r}
              </Ratio>
            );
          })}
      </Ratios>
    </Modal>
  );

  return (
    <Container
      id={id}
      insertTo={insertTo}
      {...{
        draggable: true,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
      }}
      lastIndex={lastIndex}
    >
      {ModalCondition}
      <Indicator position={insertTo} />
      <Component id={id} type={type} />
      {direction === 'row' && !lastIndex && (
        <Configure onClick={onModalShow}>
          <Slide />
        </Configure>
      )}
    </Container>
  );
};

const Slide: React.FC = () => (
  <svg width="10" height="34" viewBox="0 0 10 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 33L3 33L3 0.999999L0.999999 0.999999" stroke="#9d9d9d" strokeLinecap="round" />
    <path d="M9 1L7 1L7 33L9 33" stroke="#9d9d9d" strokeLinecap="round" />
  </svg>
);
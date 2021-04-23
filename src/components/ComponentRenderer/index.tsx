import React, { useContext, useMemo } from 'react';
import { Indicator, Container, Configure, Type, Ratios, Ratio } from './componentsStyles';
import { useDragAndDrop, useModal } from '../../hooks';
import { ChildComponent } from '../../utils/tree';
import { TreeContext } from '../../utils/context';
import { CatalogComponent } from '../../hocs/createCatalogComponent';
import { Modal } from '../Modal';


type Props = {
  component: ChildComponent;
  direction: string;
  ratios: Record<number, string[]>;
  onRatioSelect: (val: number) => void;
};

export const ComponentRenderer: React.FC<Props> = ({ component, direction, ratios, onRatioSelect }) => {
  const { id, type } = component;
  const {
    onDragLeave,
    onDragStart,
    onDragOver,
    onDrop,
    insertTo,
  } = useDragAndDrop(id);

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

  const { modalShown, show, onModalClose } = useModal();

  const ModalCondition = modalShown && (
    <Modal onClose={onModalClose}>
      <Type>Row settings</Type>
      Possible ratios:
      <Ratios>
        {direction === 'row' &&
          components?.length &&
          ratios[components.length]?.map((r: string, index: number) => {
            return (
              <Ratio key={r} onClick={() => onRatioSelect(index)}>
                {r}
              </Ratio>
            );
          })}
      </Ratios>
    </Modal>
  )

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
    >
      {ModalCondition}
      <Indicator position={insertTo} />
      <Component id={id} type={type} />
      {direction === 'row' && <Configure onClick={show} />}
    </Container>
  );
};

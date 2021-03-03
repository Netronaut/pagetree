import React, { useContext, useMemo } from 'react';
import { Indicator, Container } from './componentsStyles';
import { useDragAndDrop } from '../../hooks';
import { ChildComponent } from '../../utils/tree';
import { TreeContext } from '../../utils/context';
import { CatalogComponent } from '../../hocs/createCatalogComponent';

type Props = {
  component: ChildComponent;
};

export const ComponentRenderer: React.FC<Props> = ({ component }) => {
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
      <Indicator position={insertTo} />
      <Component id={id} type={type} />
    </Container>
  );
};

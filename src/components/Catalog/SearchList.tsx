import React, { useContext } from 'react';
import { DroppableComponentContainer } from './componentsStyles';
import { useDragAndDrop } from '../../hooks';
import { TreeContext } from '../../utils/context';

type Props = {
  searchValue: string;
};

export const SearchList: React.FC<Props> = ({ searchValue }) => {
  const { components } = useContext(TreeContext);
  const { onDragStart } = useDragAndDrop();

  const filtered = components?.filter((component) => {
    const { componentName } = component;
    const serachCondition = componentName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    if (searchValue == '') return component;
    else if (serachCondition) return component;
  });
  const maped = filtered?.map(({ componentName, type }, i) => (
    <DroppableComponentContainer
      id={type}
      key={`droppable-component-${i}`}
      {...{
        draggable: true,
        onDragStart,
      }}
    >
      {componentName}
    </DroppableComponentContainer>
  ));
  return <>{maped}</>;
};

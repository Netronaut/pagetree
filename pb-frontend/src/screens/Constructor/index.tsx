import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextComponent from './components/Text';
import GridComponent from './components/Grid';
import Separator from './components/Separator';
import ComponentWrapper, {
  DroppableComponent,
} from './components/ComponentWrapper';
import {
  ConstructorScreen,
  DroppableComponentContainer,
  DroppableContent,
  Footer,
} from './componentsStyles';

const ComponentByType = {
  separator: Separator,
  text: TextComponent,
  grid: GridComponent,
};

type ComponentType = keyof typeof ComponentByType;

export type Component = {
  text?: string;
  isActive?: boolean;
  id: string;
  type: ComponentType;
};

const droppableComponents = [
  {
    title: 'Text',
    type: 'text',
  },
  {
    title: 'Grid',
    type: 'grid',
  },
];

const getContainerScroll = () => {
  const container = document.getElementById('droppable-content');
  return container?.scrollTop || 0;
};

const separatorsElements = document.getElementsByClassName('separator');

const getRandomId = () => Math.random().toString(32);

const moveItemInArray = (
  array: Component[],
  oldIndex: number,
  newIndex: number,
) => {
  const newArr = [...array];
  const removedItems = newArr.splice(oldIndex, 1);
  newArr.splice(newIndex, 0, removedItems[0]);
  return newArr;
};

export const Constructor = () => {
  const [arr, setArr] = useState<Component[]>([]);
  const [displayArr, setDisplayArr] = useState<Component[]>([]);
  const [isDragging, setDragging] = useState(false);
  const nearestSeparator = useRef<number>();
  const separators = useRef([0]);

  const x = useRef(0);
  const y = useRef(0);
  const width = useRef(0);
  const height = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    width.current = e.currentTarget.getBoundingClientRect().width;
    height.current = e.currentTarget.getBoundingClientRect().height;
    x.current = e.pageX - e.currentTarget.getBoundingClientRect().left;
    y.current = e.pageY - e.currentTarget.getBoundingClientRect().top;
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('itemId', event.currentTarget.id);
    const element = arr.find(({ id }) => id === event.currentTarget.id);
    if (element) {
      const itemView = document.getElementById(element.type);
      if (itemView) {
        event.dataTransfer.setDragImage(itemView, 250, 70);
      }
    }
  };

  useEffect(() => {
    const mixedArray: Component[] = [{ type: 'separator', id: 'separator_0' }];
    arr.forEach((el, i) => {
      mixedArray.push(el, { type: 'separator', id: `separator_${i + 1}` });
    });
    setDisplayArr(mixedArray);
  }, [arr]);
  useEffect(() => {
    const topCoordinates = [];
    for (let i = 0; i < separatorsElements.length; i++) {
      topCoordinates.push(
        separatorsElements[i].getBoundingClientRect().top +
          getContainerScroll(),
      );
    }
    separators.current = topCoordinates;
  }, [displayArr]);

  const handleInputChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();

    const newArr = displayArr.map((el) => {
      if (el.id === e.target.id) {
        return {
          ...el,
          text: e.target.value,
        };
      }
      return el;
    });
    setDisplayArr(newArr);
  };

  const setSeparatorsStyles = (nearestSeparatorIndex?: number) => {
    separators.current.forEach((_, index) => {
      const separator = document.getElementById(`separator_${index}`);
      if (separator) {
        if (index === nearestSeparatorIndex) {
          separator.style.backgroundColor = '#58e6ec';
        } else {
          separator.style.backgroundColor = 'transparent';
        }
      }
    });
  };

  const onContentDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    const top = e.pageY + getContainerScroll() - y.current + height.current / 2;
    const diffs = separators.current.map((separatorTop) =>
      Math.abs(separatorTop - top),
    );
    const minDiff = Math.min(...diffs);
    const nearestSeparatorIndex = diffs.indexOf(minDiff);
    nearestSeparator.current = nearestSeparatorIndex;
    setSeparatorsStyles(nearestSeparatorIndex);
  };

  const deleteComponent = (itemId: string) => {
    setArr((prev) => {
      return prev.filter(({ id }) => id !== itemId);
    });
  };

  const addComponent = (type: ComponentType, index: number) => {
    setArr((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 0, {
        text: `${type} ${prev.length + 1}`,
        id: getRandomId(),
        isActive: false,
        type,
      });
      return newArr;
    });
  };

  const moveComponent = (itemId: string, toIndex: number) => {
    setArr((prev) => {
      const oldIndex = prev.findIndex(({ id }) => id === itemId);
      const newIndex = toIndex - (toIndex > oldIndex ? 1 : 0);

      return moveItemInArray(prev, oldIndex, newIndex);
    });
  };

  const onDropContent = (
    e: React.DragEvent<HTMLDivElement>,
    isDelete?: boolean,
  ) => {
    setDragging(false);
    const itemId: string = e.dataTransfer.getData('itemId');
    if (isDelete) {
      deleteComponent(itemId);
    } else if (typeof nearestSeparator.current !== 'undefined') {
      if (['text', 'grid'].includes(itemId)) {
        addComponent(itemId as ComponentType, nearestSeparator.current);
      } else {
        moveComponent(itemId, nearestSeparator.current);
      }
    }
    setSeparatorsStyles();
  };

  const addNextToComponent = (id: string) => {
    const separatorIndex = displayArr?.findIndex((el) => el.id === id);
    const firstSeparator = separatorIndex === 0;
    const itemDisplayed = displayArr?.find((el, i) => {
      return firstSeparator
        ? i === separatorIndex + 1
        : i === separatorIndex - 1;
    });
    const itemIndex = arr?.findIndex((el) => el.id === itemDisplayed?.id);
    if (itemDisplayed && itemDisplayed.type) {
      addComponent(
        itemDisplayed.type,
        firstSeparator ? itemIndex : itemIndex + 1,
      );
    }
  };

  const onFooterDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSeparatorsStyles();
    nearestSeparator.current = undefined;
  };

  return (
    <ConstructorScreen>
      <DroppableContent
        id="droppable-content"
        onDragOver={onContentDragOver}
        onDrop={onDropContent}
      >
        {displayArr?.map((element: Component) => {
          const { type, id } = element;
          const isSeparator = isDragging || !!arr.length;
          return (
            <ComponentWrapper
              key={id}
              Component={ComponentByType[type] as DroppableComponent}
              id={id}
              element={element}
              addPrevComponent={addNextToComponent}
              handleInputChangeText={handleInputChangeText}
              isSeparator={isSeparator}
              {...{
                draggable: true,
                onMouseDown,
                onDragStart,
              }}
            />
          );
        })}
      </DroppableContent>
      <Footer
        onDragOver={onFooterDragOver}
        onDrop={(e) => onDropContent(e, true)}
      >
        {droppableComponents?.map((c, i) => {
          return (
            <DroppableComponentContainer
              id={c.type}
              key={`droppable-component-${i}`}
              {...{ draggable: true, onMouseDown, onDragStart }}
            >
              {c.title}
            </DroppableComponentContainer>
          );
        })}
      </Footer>
    </ConstructorScreen>
  );
};

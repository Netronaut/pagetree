import * as React from 'react';
import './styles.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type Component = {
  text?: string;
  isActive?: boolean;
  id: string;
  type?: string;
};

type TextProps = {
  key: string;
  element: Component;
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

export const Constructor = () => {
  const [arr, setArr] = useState<Component[]>([]);
  const [displayArr, setDisplayArr] = useState<Component[]>([]);
  const nearestSeparator = useRef<number>();
  const x = useRef(0);
  const y = useRef(0);
  const width = useRef(0);
  const height = useRef(0);
  const separators = useRef([0]);

  useEffect(() => {
    const mixedArray: Component[] = [{ type: 'separator', id: 'separator_0' }];
    arr.forEach((el, i) => {
      mixedArray.push(...[el, { type: 'separator', id: `separator_${i + 1}` }]);
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

  const getNearestSeparator = (nearestSeparatorIndex?: number) => {
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

  const onContentDrugOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const top = e.pageY + getContainerScroll() - y.current + height.current / 2;
    const diffs = separators.current.map((separatorTop) =>
      Math.abs(separatorTop - top),
    );
    const minDiff = Math.min(...diffs);
    const nearestSeparatorIndex = diffs.indexOf(minDiff);
    nearestSeparator.current = nearestSeparatorIndex;
    getNearestSeparator(nearestSeparatorIndex);
  };

  const onContentDrop = (
    e: React.DragEvent<HTMLDivElement>,
    isDelete?: boolean,
  ) => {
    const itemId: string = e.dataTransfer.getData('itemId');
    if (isDelete) {
      setArr((prev) => {
        return prev.filter(({ id }) => id !== itemId);
      });
    }
    if (['text', 'grid'].includes(itemId)) {
      setArr((prev) => {
        if (typeof nearestSeparator.current !== 'undefined') {
          const newArr = [...prev];
          newArr.splice(nearestSeparator.current, 0, {
            text: `${itemId} ${prev.length + 1}`,
            id: `${itemId}_${prev.length + 1}`,
            isActive: false,
            type: itemId,
          });
          return newArr;
        }
        return prev;
      });
    } else {
      setArr((prev) => {
        if (typeof nearestSeparator.current !== 'undefined') {
          const oldIndex = prev.findIndex(({ id }) => id === itemId);
          const newArr = [...prev];
          const items = newArr.splice(oldIndex, 1);
          newArr.splice(
            nearestSeparator.current -
              (nearestSeparator.current > oldIndex ? 1 : 0),
            0,
            items[0],
          );
          return newArr;
        }
        return prev;
      });
    }

    getNearestSeparator();
  };

  const onComponentDrugOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    getNearestSeparator();
    nearestSeparator.current = undefined;
  };
  const onComponentMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    width.current = e.currentTarget.getBoundingClientRect().width;
    height.current = e.currentTarget.getBoundingClientRect().height;
    x.current = e.pageX - e.currentTarget.getBoundingClientRect().left;
    y.current = e.pageY - e.currentTarget.getBoundingClientRect().top;
  };

  const onDrugStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('itemId', event.currentTarget.id);
  };

  const Separator = ({ id }: Component) => (
    <div className="separator-wrapper">
      <div
        className="separator"
        key={`separator_${id}`}
        id={id}
        style={{ height: 4, width: '100%', borderRadius: 10 }}
      />
    </div>
  );

  const Text = ({ element }: TextProps) => {
    return (
      <div
        className="component-container"
        id={element.id}
        draggable
        onDragStart={onDrugStart}
        onMouseDown={onComponentMouseDown}
      >
        <input
          className="input-active"
          id={element.id}
          type="text"
          value={element.text}
          readOnly
          onChange={handleInputChangeText}
        />
      </div>
    );
  };

  const Grid = ({ key, element }: TextProps) => {
    return (
      <div
        className="component-container"
        id={element.id}
        key={key}
        draggable
        onDragStart={onDrugStart}
        onMouseDown={onComponentMouseDown}
      />
    );
  };

  return (
    <div className="test-screen">
      <div
        className="droppable-content"
        id="droppable-content"
        onDragOver={onContentDrugOver}
        onDrop={(e) => onContentDrop(e)}
      >
        {displayArr.map((element: Component) => {
          if (element.type === 'separator') {
            return <Separator key={element.id} id={element.id} />;
          } else if (element.type === 'text') {
            return <Text key={element.id} element={element} />;
          } else if (element.type === 'grid') {
            return <Grid key={element.id} element={element} />;
          }
        })}
      </div>
      <div
        className="footer"
        onDragOver={onComponentDrugOver}
        onDrop={(e) => onContentDrop(e, true)}
      >
        {droppableComponents.map((c, i) => {
          return (
            <div
              id={c.type}
              key={`droppable-component-${i}`}
              className="droppable-component"
              draggable
              onDragStart={onDrugStart}
              onMouseDown={onComponentMouseDown}
            >
              {c.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

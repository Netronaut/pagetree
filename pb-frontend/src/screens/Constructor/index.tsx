import React, { useState } from 'react';
import './styles.scss';

import Catalog from './components/Catalog';
import {
  Direction as DirectionType,
  add as addToTree,
  remove as removeFromTree,
} from 'src/utils/tree';

import {
  ConstructorScreen,
  DroppableContent,
  Footer,
} from './componentsStyles';
import { Direction } from './components/Direction';

const testData = {
  direction: 'column',
  id: '0',
  components: [
    {
      direction: 'row',
      id: '0',
      components: [
        { id: '0-0', type: 'text' },
        { id: '0-1', type: 'text' },
        { id: '0-2', type: 'text' },
      ],
    },
    {
      direction: 'row',
      id: '1',
      components: [
        { id: '1-0', type: 'text' },
        { id: '1-1', type: 'text' },
        {
          direction: 'column',
          id: '1-2',
          components: [
            { id: '1-2-0', type: 'text' },
            { id: '1-2-1', type: 'text' },
          ],
        },
      ],
    },
    {
      direction: 'row',
      id: '2',
      components: [
        { id: '2-0', type: 'text' },
        { id: '2-1', type: 'text' },
        {
          direction: 'column',
          id: '2-2',
          components: [
            { id: '2-2-0', type: 'text' },
            { id: '2-2-1', type: 'text' },
          ],
        },
      ],
    },
  ],
};

export const TreeContext = React.createContext({} as any);

const { Provider } = TreeContext;

export const Constructor = () => {
  const [arr, setArr] = useState<DirectionType>(testData as DirectionType);

  const add = (pathTo: number[], e: React.DragEvent<HTMLDivElement>) => {
    const pathFrom = e.dataTransfer.getData('pathFrom');
    console.log('pathFrom ==>', pathFrom, 'pathTo ==>', pathTo);
    const newType = e.dataTransfer.getData('newType');
    if (pathFrom) {
      const { item, result, newPathTo = pathTo } = removeFromTree(
        arr,
        pathFrom.split('-').map(Number),
      );
      const newTree = addToTree(result, newPathTo, item);
      setArr(newTree);
    }
    // addToTree(arr, path, item);
  };

  return (
    <Provider value={{ add }}>
      <ConstructorScreen>
        <DroppableContent
          id="droppable-content"
          onDragOver={(e) => e.preventDefault()}
        >
          <Direction
            direction={arr.direction as DirectionType['direction']}
            components={arr.components}
          />
        </DroppableContent>
        <Footer onDragOver={(e) => e.preventDefault()}>
          <Catalog />
        </Footer>
      </ConstructorScreen>
    </Provider>
  );
};

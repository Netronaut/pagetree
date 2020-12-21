import React from 'react';
import Container, { DroppableComponent } from '../Container';
import { Component, ComponentByType } from '../../types';

type ContainerProps = {
  content: Component[];
  addContent: (index: number, isBefore?: boolean) => (item: string) => void;
};

const Content: React.FC<ContainerProps> = ({ content, addContent }) => {
  const addBefore = (index: number) => addContent(index, true);
  const addAfter = (index: number) => addContent(index);

  return (
    <>
      {content?.map((element: Component, index: number) => {
        const { type, id } = element;
        return (
          <Container
            key={id}
            Component={ComponentByType[type] as DroppableComponent}
            id={id}
            element={element}
            addBefore={addBefore(index)}
            addAfter={addAfter(index)}
          />
        );
      })}
    </>
  );
};

export default Content;

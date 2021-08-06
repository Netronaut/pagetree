import React, { DragEvent, ReactElement, useContext, useState } from 'react';
import styled from 'styled-components';
import { PageTreeDispatchContext } from '../provider';
import { TrashIcon } from './icons';

const DropArea = styled.div<{ $target: boolean }>`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 80px;
  height: 80px;
  background: #39a7ff;
  color: white;
  border-radius: 15px;
  padding: 15px;

  * {
    pointer-events: none;
  }

  ${({ $target }) => ($target ? `transform: scale(1.05);` : '')}
`;

export const RemoveDropArea = (): ReactElement => {
  const dispatch = useContext(PageTreeDispatchContext);
  const [target, setTarget] = useState(false);

  const onDragOver = (event: DragEvent<EventTarget>) => {
    event.preventDefault();
    setTarget(true);
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setTarget(false);
  };

  return (
    <DropArea
      onDrop={(event) => dispatch({ type: 'remove', payload: { event } })}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      $target={target}
    >
      <TrashIcon />
    </DropArea>
  );
};

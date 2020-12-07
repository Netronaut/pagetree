import * as React from 'react';
import { Component } from '../../index';
import { ChangeEvent } from 'react';
import { useDraggable } from '../../hooks/useDraggable';

type TextProps = {
  key: string;
  element: Component;
  handleInputChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextComponent = ({ element, handleInputChangeText }: TextProps) => {
  const { draggableProps } = useDraggable();

  return (
    <div className="component-container" id={element.id} {...draggableProps}>
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

export default TextComponent;

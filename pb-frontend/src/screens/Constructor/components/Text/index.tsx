import * as React from 'react';
import { Component } from '../../index';
import { ChangeEvent } from 'react';
import { ComponentContainer, Input } from './componentsStyles';

type TextProps = {
  key: string;
  element: Component;
  handleInputChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextComponent = ({
  element,
  handleInputChangeText,
  ...rest
}: TextProps) => {
  return (
    <ComponentContainer id={element.id} {...rest}>
      <Input
        id={element.id}
        type="text"
        value={element.text}
        readOnly
        onChange={handleInputChangeText}
      />
    </ComponentContainer>
  );
};

export default TextComponent;

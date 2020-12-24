import React from 'react';
import { ComponentContainer, Input } from './componentsStyles';
import { Component } from '../../types';

type TextProps = {
  element: Component;
};

const TextComponent = ({ element, ...rest }: TextProps) => {
  return (
    <ComponentContainer id={element.id} {...rest}>
      <Input id={element.id} type="text" value={element.id} readOnly />
    </ComponentContainer>
  );
};

export default TextComponent;

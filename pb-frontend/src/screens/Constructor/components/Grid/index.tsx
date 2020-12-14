import * as React from 'react';
import { Component } from '../../index';
import { ComponentContainer } from './componentsStyles';

type GridProps = {
  key: string;
  element: Component;
};

const GridComponent = ({ key, element, ...rest }: GridProps) => {
  return <ComponentContainer id={element.id} key={key} {...rest} />;
};

export default GridComponent;

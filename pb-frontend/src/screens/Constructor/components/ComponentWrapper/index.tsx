import * as React from 'react';
import { ChangeEvent } from 'react';
import { Component } from '../../index';

type ComponentWrapperProps = {
  Component: DroppableComponent;
  id?: string;
  addPrevComponent?: (id: string) => void;
  handleInputChangeText?: (e: ChangeEvent<HTMLInputElement>) => void;
  element?: Component;
  key?: string;
  isDragging: boolean;
};

type DroppableComponentProps = {
  id?: string;
  addPrevComponent?: (id: string) => void;
  handleInputChangeText?: (e: ChangeEvent<HTMLInputElement>) => void;
  element?: Component;
  key?: string;
};

export type DroppableComponent = React.ComponentType<DroppableComponentProps>;

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  Component,
  ...rest
}) => {
  return <Component {...rest} />;
};

export default ComponentWrapper;

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Tooltip, TooltipProps } from './Tooltip';
import { Button } from '../Button';

export const TooltipDefault = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

TooltipDefault.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
};

export const TooltipRight = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

TooltipRight.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
  direction: 'right',
};

export const TooltipBottom = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

TooltipBottom.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
  direction: 'bottom',
};

export const TooltipLeft = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

TooltipLeft.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
  direction: 'left',
};

export const WithLongText = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

WithLongText.args = {
  children: <Button>Button</Button>,
  content:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aspernatur esse corporis voluptates dolorum id provident est, et ad debitis ipsum perspiciatis delectus exercitationem! Dolore harum mollitia iure enim perspiciatis?',
  direction: 'right',
};

export const WithLongDelay = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

WithLongDelay.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
  direction: 'right',
  delay: 1200,
};

export const WithoutDelay = (args: TooltipProps): ReactElement => <Tooltip {...args} />;

WithoutDelay.args = {
  children: <Button>Button</Button>,
  content: 'tooltip content',
  direction: 'right',
  delay: 0,
};

export const List = (): ReactElement => (
  <Ul>
    <li>
      <TooltipDefault content="1" direction="bottom">
        <Button>Button 1</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="2" direction="right">
        <Button>Button 2</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="3" direction="top">
        <Button>Button 3</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="4" direction="bottom">
        <Button>Button 4</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="5" direction="left">
        <Button>Button 5</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="6" direction="top">
        <Button>Button 6</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="7" direction="bottom">
        <Button>Button 7</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="8" direction="left">
        <Button>Button 8</Button>
      </TooltipDefault>
    </li>
    <li>
      <TooltipDefault content="9" direction="top">
        <Button>Button 9</Button>
      </TooltipDefault>
    </li>
  </Ul>
);

const Ul = styled.div`
  display: grid;
  list-style: none;
  grid-auto-flow: column;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 4px;
  width: 50%;
`;

export default {
  title: 'Components/Tooltip',
  component: List,
};

import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TPageData } from '../../types';

type Props = {
  page: TPageData;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const PageItem: React.FC<Props> = ({
  page: { title, link, id },
  remove,
  openEdit,
}) => {
  return (
    <Wrapper>
      <Flex width="80%" flexDirection="column">
        <Title>{title}</Title>
        <Link to={`pagebuilder${link}`}>{link}</Link>
      </Flex>
      <Flex width="20%" justifyContent="flex-end">
        <Button onClick={() => remove(id)}>Remove</Button>
        <Button onClick={() => openEdit(id)}>Edit</Button>
      </Flex>
    </Wrapper>
  );
};

export const Title = styled.h3`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Url = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  color: #978997;
  font-size: 14px;
`;

export const Button = styled.button`
  margin-left: 5px;
`;

export const Wrapper = styled.li`
  display: flex;
  border: solid black 1px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Flex = styled.div<{
  flexDirection?: 'column' | 'row';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  width?: string;
  px?: number;
}>`
  display: flex;
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ width }) => `width: ${width};`}
  ${({ flexDirection }) => `flex-direction: ${flexDirection};`}
  ${({ alignItems }) => `align-items: ${alignItems};`}
  ${({ px }) => `padding: 0 ${px}px;`}
`;

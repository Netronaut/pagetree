import React from 'react';
import styled from 'styled-components';
import { TLink } from '../../types';

type Props = {
  article: TLink;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const Article: React.FC<Props> = ({
  article: { title, link, id },
  remove,
  openEdit,
}) => {
  return (
    <ArticleBlock key={id}>
      <Flex width="80%" flexDirection="column">
        <Title>{title}</Title>
        <Url>{link}</Url>
      </Flex>
      <Flex width="20%" justifyContent="flex-end">
        <Button onClick={() => remove(id)}>Remove</Button>
        <Button onClick={() => openEdit(id)}>Edit</Button>
      </Flex>
    </ArticleBlock>
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

export const ArticleBlock = styled.li`
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
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  width?: string;
}>`
  display: flex;
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ width }) => `width: ${width};`}
  ${({ flexDirection }) => `flex-direction: ${flexDirection};`}
`;

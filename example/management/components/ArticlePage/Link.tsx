import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  link: string;
  id: number;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const Link: React.FC<Props> = ({
  title,
  id,
  link,
  remove,
  openEdit,
}) => {
  return (
    <LinkBlock key={id}>
      <Flex width="80%">
        <Title>{title}</Title>
        <LinkText>{link}</LinkText>
      </Flex>
      <Flex width="20%" justifyContent="flex-end">
        <Button onClick={() => remove(id)}>Remove</Button>
        <Button onClick={() => openEdit(id)}>Edit</Button>
      </Flex>
    </LinkBlock>
  );
};

export const Title = styled.h3`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const LinkText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  color: #978997;
  font-size: 14px;
`;

export const Button = styled.button`
  margin-left: 5px;
`;

export const LinkBlock = styled.li`
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
`;

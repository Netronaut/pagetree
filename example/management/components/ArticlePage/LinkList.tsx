import React from 'react';
import styled from 'styled-components';
import { TLink } from '../../types';
import { Link } from './Link';

type Props = {
  links: TLink[];
  check: (id: number) => void;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const LinkList: React.FC<Props> = ({
  links,
  remove,
  check,
  openEdit,
}) => (
  <List>
    {links.map(({ title, link, id }) => {
      const props = { title, link, id, remove, check, openEdit };
      return <Link key={id} {...props} />;
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;

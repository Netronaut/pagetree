import * as React from 'react';
import styled from 'styled-components';
import { TPageData } from '../../types';
import { PageItem } from './PageItem';

type Props = {
  pages: TPageData[];
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const PageList: React.FC<Props> = ({ pages, remove, openEdit }) => (
  <List>
    {pages.map((page) => {
      const props = { page, remove, openEdit };
      return <PageItem key={page.id} {...props} />;
    })}
  </List>
);

export const List = styled.ul`
  border: 1px solid;
  border-radius: 3px;
  padding: 20px 15px;
  list-style: none;
`;

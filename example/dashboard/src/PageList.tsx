import React, { ReactElement } from 'react';

import { PageEntity } from '../../strapi/src/types';
import { PageItem } from './PageItem';
import { Table, SmallerBold } from './PageList.styles';
interface PageListProps {
  children: ReactElement;
  primary?: boolean;
  pages: PageEntity[];
}

export const PageList = ({ pages }: PageListProps) => (
  <Table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>
          <SmallerBold>Status</SmallerBold>
        </th>
      </tr>
    </thead>
    <tbody>
      {pages.length &&
        pages.map((page) => {
          const { title, isPined, version } = page;
          return <PageItem key={page.id} isPined={isPined} title={title} version={version || ''} />;
        })}
    </tbody>
  </Table>
);

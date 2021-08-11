import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { PageEntity } from '../../strapi/src/types';
import { PageItem } from './PageItem';

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

export const Table = styled.table`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #333333;

  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-style: hidden;

  thead th:nth-child(1) {
    width: 1.9%;
  }

  thead th:nth-child(2) {
    width: 60.5%;
  }

  thead th:nth-child(3) {
    width: 2.7%;
  }

  thead th:nth-child(4) {
    width: 2.7%;
  }

  tbody tr {
    cursor: pointer;
  }

  th {
    padding: 23px 7px 8px;
    border-bottom: solid rgba(51, 51, 51, 0.3) 0.5px;
  }

  td {
    padding: 23px 7px 21px;
    border-bottom: solid rgba(51, 51, 51, 0.3) 0.5px;
  }

  th:nth-child(1),
  td:nth-child(1) {
    padding-left: 21px;
  }

  th:nth-child(5),
  td:nth-child(5) {
    padding-left: 25px;
  }
`;

export const SmallerBold = styled.span`
  font-style: normal;
  font-weight: 700;
`;

import React from 'react';
import { SmallerBold } from './PageList.styles';

export const PageListHeader: React.FC = () => (
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th>
      <SmallerBold>Status</SmallerBold>
    </th>
  </tr>
);

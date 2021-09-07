import React, { ReactElement } from 'react';
import { SmallerBold } from '../Typography';

export const PageListHeader = (): ReactElement => (
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th>
      <SmallerBold>Status</SmallerBold>
    </th>
  </tr>
);

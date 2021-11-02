import { useDropRemove } from '@pagetree/builder';
import React, { ReactElement } from 'react';
import { DeleteIcon } from '../icons';
import { Default } from '../Typography';
import { DropToRemoveCaptive, DropToRemoveIndicator } from './Catalog.styles';

export interface DropToRemoveProps {
  hide?: boolean;
}

export const DropToRemove = ({ hide = false }: DropToRemoveProps): ReactElement => (
  <DropToRemoveCaptive id="pagetree-remove" hide={hide} {...useDropRemove()}>
    <DropToRemoveIndicator>
      <DeleteIcon width="96" height="96" />
      <Default>Drop here to remove</Default>
    </DropToRemoveIndicator>
  </DropToRemoveCaptive>
);

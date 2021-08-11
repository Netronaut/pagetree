import React, { ReactElement } from 'react';

import { PageEntity } from '../../../strapi/src/types';
import { useModal } from '../../../../src/hooks'; // TODO: need to import from the '@pagio/builder';

import { PageItem } from './PageItem';
import { Table, SmallerBold } from './PageList.styles';
interface PageListProps {
  children: ReactElement;
  primary?: boolean;
  pages: PageEntity[];
}

export const PageList = ({ pages }: PageListProps) => {
  const { isModalShown, onModalShow, onModalClose } = useModal();
  const handleRemove = (page: PageEntity) =>
    console.log(`page with the id:${page.id} should be remove`);

  return (
    <>
      {isModalShown && (
        <h2>
          Should open the Editing modal window <button onClick={onModalClose}>close editing</button>
        </h2>
      )}
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
            pages.map((page) => (
              <PageItem key={page.id} page={page} onEdit={onModalShow} onRemove={handleRemove} />
            ))}
        </tbody>
      </Table>
    </>
  );
};

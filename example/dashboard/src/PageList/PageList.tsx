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

  return (
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
            return (
              <PageItem
                key={page.id}
                isPined={isPined}
                title={title}
                version={version || ''}
                onModalShow={onModalShow}
              />
            );
          })}
      </tbody>
      {isModalShown && (
        <h2>
          Should open the Edting modal window <button onClick={onModalClose}>close editing</button>
        </h2>
      )}
    </Table>
  );
};

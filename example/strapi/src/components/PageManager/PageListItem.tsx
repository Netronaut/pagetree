import React, { ReactElement } from 'react';
import S from './PageManager.styles';
import { Link } from 'react-router-dom';
import { PageEntity } from '../../types';

interface PageListItemProps {
  page: PageEntity;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
}

export const PageListItem = ({ page, remove, openEdit }: PageListItemProps): ReactElement => (
  <S.PageListItem>
    <S.PageItemTitle>
      <Link to={`pagebuilder/${page.id}`}>
        <>
          <h4>{page.title}</h4>
          <p>{page.path}</p>
        </>
      </Link>
    </S.PageItemTitle>
    <S.PageItemButton onClick={() => openEdit(page.id)}>Edit</S.PageItemButton>
    <S.PageItemButton destructive onClick={() => remove(page.id)}>
      Remove
    </S.PageItemButton>
  </S.PageListItem>
);

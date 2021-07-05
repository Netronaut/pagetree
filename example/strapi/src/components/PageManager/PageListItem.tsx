import React, { ReactElement } from 'react';
import S from './PageManager.styles';
import { Link } from 'react-router-dom';
import { TPageData } from '../../types';

interface PageListItemProps {
  page: TPageData;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
}

export const PageListItem = ({ page, remove, openEdit }: PageListItemProps): ReactElement => (
  <S.PageListItem>
    <S.PageItemTitle>
      <Link to={`pagebuilder${page.link}`}>
        <>
          <h4>{page.title}</h4>
          <p>{page.link}</p>
        </>
      </Link>
    </S.PageItemTitle>
    <S.PageItemButton onClick={() => openEdit(page.id)}>Edit title</S.PageItemButton>
    <S.PageItemButton destructive onClick={() => remove(page.id)}>
      Remove
    </S.PageItemButton>
  </S.PageListItem>
);
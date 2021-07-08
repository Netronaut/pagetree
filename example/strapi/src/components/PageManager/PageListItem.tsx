import React, { ReactElement } from 'react';
import S from './PageManager.styles';
import { Link } from 'react-router-dom';
import { PageEntity } from '../../types';

interface PageListItemProps {
  page: PageEntity;
  onRemove: (page: PageEntity) => void;
  onEdit: (page: PageEntity) => void;
}

export const PageListItem = ({ page, onRemove, onEdit }: PageListItemProps): ReactElement => (
  <S.PageListItem>
    <S.PageItemTitle>
      <Link to={`pagebuilder/${page.id}`}>
        <>
          <h4>{page.title}</h4>
          <p>{page.path}</p>
        </>
      </Link>
    </S.PageItemTitle>
    <S.PageItemButton onClick={() => onEdit(page)}>Edit</S.PageItemButton>
    <S.PageItemButton destructive onClick={() => onRemove(page)}>
      Remove
    </S.PageItemButton>
  </S.PageListItem>
);

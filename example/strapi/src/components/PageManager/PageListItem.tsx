import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PageEntity } from '../../types';
import { PageItemButton, PageItemTitle, PageListItemContainer } from './PageManager.styles';

interface PageListItemProps {
  page: PageEntity;
  onRemove: (page: PageEntity) => void;
  onEdit: (page: PageEntity) => void;
}

export const PageListItem = ({ page, onRemove, onEdit }: PageListItemProps): ReactElement => (
  <PageListItemContainer>
    <PageItemTitle>
      <Link to={`pagebuilder/${page.id}`}>
        <>
          <h4>{page.title}</h4>
          <p>{page.path}</p>
        </>
      </Link>
    </PageItemTitle>
    <PageItemButton onClick={() => onEdit(page)}>Edit</PageItemButton>
    <PageItemButton destructive onClick={() => onRemove(page)}>
      Remove
    </PageItemButton>
  </PageListItemContainer>
);

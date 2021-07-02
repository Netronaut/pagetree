import React, { ReactElement } from 'react';
import S from './PageManager.styles';
import { Link } from 'react-router-dom';
import { TPageData } from '../../types';

type PageManagerRowProps = {
  page: TPageData;
  remove: (id: number) => void;
  openEdit: (id: number) => void;
};

export const PageManagerRow = ({ page, remove, openEdit }: PageManagerRowProps): ReactElement => {
  return (
    <>
      <S.PageManagerRow>
        <S.PageManagerRowTitle>
          <Link title="Open in pagebuilder" to={`pagebuilder${page.link}`}>
            <>
              <h4>{page.title}</h4>
              <p>{page.link}</p>
            </>
          </Link>
        </S.PageManagerRowTitle>
        <S.PageItemButton onClick={() => openEdit(page.id)}>Edit title</S.PageItemButton>
        <S.PageItemButton className="destructive" onClick={() => remove(page.id)}>
          Remove
        </S.PageItemButton>
      </S.PageManagerRow>
    </>
  );
};

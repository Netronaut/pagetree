import React, { Dispatch, ReactElement } from 'react';
import { useLocation } from 'react-router';
import { Logo } from './Logo';

import S from './Header.styles';

interface HeaderProps {
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setShowPreview }: HeaderProps): ReactElement => {
  const { pathname } = useLocation();
  return (
    <S.HeadWrapper>
      <S.LogoLink to="/">
        <Logo />
        <span>Pagio</span>
      </S.LogoLink>
      {/^\/pagebuilder/.test(pathname) && (
        <S.HeadContent>
          <S.Label htmlFor="toggle-button">Preview mode</S.Label>
          <S.ToggleButton
            id="toggle-button"
            type="checkbox"
            onChange={() => setShowPreview((prev) => !prev)}
          />
        </S.HeadContent>
      )}
    </S.HeadWrapper>
  );
};

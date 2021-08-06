import React, { Dispatch, ReactElement } from 'react';
import { useLocation } from 'react-router';
import { Logo } from './Logo';
import { HeadContent, HeadWrapper, Label, LogoLink, ToggleButton } from './Header.styles';

interface HeaderProps {
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setShowPreview }: HeaderProps): ReactElement => {
  const { pathname } = useLocation();
  return (
    <HeadWrapper>
      <LogoLink to="/">
        <Logo />
        <span>Pagio</span>
      </LogoLink>
      {/^\/pagebuilder/.test(pathname) && (
        <HeadContent>
          <Label htmlFor="toggle-button">Preview mode</Label>
          <ToggleButton
            id="toggle-button"
            type="checkbox"
            onChange={() => setShowPreview((prev) => !prev)}
          />
        </HeadContent>
      )}
    </HeadWrapper>
  );
};

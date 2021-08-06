import type { ReactElement } from 'react';
import React from 'react';
import { BrandLogo } from './BrandLogo';

import { HeadWrapper, Logo, HeadContent, ToggleButton, Label } from './components.styles';

interface HeaderProps {
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setShowPreview }: HeaderProps): ReactElement => (
  <HeadWrapper>
    <Logo>
      <BrandLogo />
      <span>Pagio</span>
    </Logo>
    <HeadContent>
      <Label htmlFor="toggle-button">Preview mode</Label>
      <ToggleButton
        id="toggle-button"
        type="checkbox"
        onChange={() => setShowPreview((prev) => !prev)}
      />
    </HeadContent>
  </HeadWrapper>
);

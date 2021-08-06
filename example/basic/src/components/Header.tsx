import type { ReactElement } from 'react';
import React from 'react';
import { BrandLogo } from './BrandLogo';

import { HeadRoot, Logo, HeadContent, ToggleButton, Label } from './components.styles';

interface HeaderProps {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setPreview }: HeaderProps): ReactElement => (
  <HeadRoot>
    <Logo>
      <BrandLogo />
      <span>Pagio</span>
    </Logo>
    <HeadContent>
      <Label htmlFor="toggle-button">Preview mode</Label>
      <ToggleButton
        id="toggle-button"
        type="checkbox"
        onChange={() => setPreview((preview) => !preview)}
      />
    </HeadContent>
  </HeadRoot>
);

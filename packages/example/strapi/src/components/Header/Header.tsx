import type { ReactElement } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { HeadRoot, HeadContent, Logo, Label, ToggleButton } from './Header.styles';

interface HeaderProps {
  preview?: boolean;
  setPreview?: (preview: boolean) => void;
}

export const Header = ({ preview, setPreview }: HeaderProps): ReactElement => (
  <HeadRoot>
    <Link to="/">
      <Logo>
        <BrandLogo />
        <span>Pagetree</span>
      </Logo>
    </Link>
    {setPreview && (
      <HeadContent>
        <Label htmlFor="toggle-button">Preview mode</Label>
        <ToggleButton
          id="toggle-button"
          type="checkbox"
          checked={preview}
          onChange={() => setPreview(!preview)}
        />
      </HeadContent>
    )}
  </HeadRoot>
);

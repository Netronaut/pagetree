import React from 'react';
import { HeadWrapper, Logo, HeadContent, ToggleButton, Label } from './componentsStyles';

type Props = {
  setShowPreview: void;
};

export const Header: React.FC<Props> = ({ setShowPreview }) => {

  return (
    <HeadWrapper>
      <Logo>
        <img src='logo.a4892b0f.svg' alt='logo' />
        <span>Pagio</span>
      </Logo>
      <HeadContent >
        <Label htmlFor='toggle-button'>Preview mode</Label>
        <ToggleButton
          id='toggle-button'
          type='checkbox'
          onChange={() => setShowPreview(prev => !prev)}
        />
      </HeadContent >
    </HeadWrapper>
  );
};

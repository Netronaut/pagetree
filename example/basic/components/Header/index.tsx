import React, { useContext, useMemo } from 'react';
import logo from '../../../../images/logo.png';
import { HeadWrapper, Logo, HeadContent } from './componentsStyles';

type Props = {
  setShowPreview: void;
};

export const Header: React.FC<Props> = ({ setShowPreview }) => {

  return (
    <HeadWrapper>
      <Logo src={logo} alt='logo' />
      <HeadContent >
        <input
          type='checkbox'
          onChange={() => setShowPreview(prev => !prev)}
        />
      </HeadContent >
    </HeadWrapper>
  );
};

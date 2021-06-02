import 'react-app-polyfill/ie11';
import * as React from 'react';
import { Builder } from '@pagio/builder';
import { useState } from 'react';
import { components, componentGroups } from '../../catalog';
import { Header } from '../Header';

export const PagebuilderPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState({});

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      <Builder
        pageContent={pageContent}
        onChange={setPageContent}
        showPreview={showPreview}
        components={components}
        componentGroups={componentGroups}
      />
    </>
  );
};

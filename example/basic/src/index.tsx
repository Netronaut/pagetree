import React from 'react';
import ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import type { TPage } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components, componentGroups } from './catalog';
import { Header } from './components/Header';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState<TPage | undefined>();

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
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

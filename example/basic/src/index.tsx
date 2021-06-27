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
  const [pageContent, setPageContent] = useState<TPage>({
    _id: 'test-id',
    title: 'My test page',
    route: '/test',
  });

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

import React from 'react';
import ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import type { PageStructure } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components, componentGroups } from './catalog';
import { Header } from './components/Header';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState<PageStructure>({
    _id: 'test-id',
    title: 'My test page',
    route: '/test',
  });

  const handleUpdate = (update: PageStructure) => {
    // eslint-disable-next-line no-console
    console.log(update);
    setPageContent(update);
  };

  return (
    <>
      <Header setShowPreview={setShowPreview} />
      <Builder
        pageContent={pageContent}
        onChange={handleUpdate}
        showPreview={showPreview}
        components={components}
        componentGroups={componentGroups}
      />
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Builder, PageContent } from '@pagio/builder';
import { components } from './catalog';
import { Header } from './components';
import { GlobalStyle } from './globalStyle';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState<PageContent>();

  const handleUpdate = (update: PageContent) => {
    // eslint-disable-next-line no-console
    console.info('Page structure updated');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(update, null, 2));
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
      />
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

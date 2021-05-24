import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components, componentGroups } from './catalog';
import { Header } from './components/Header';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState({});

  return (
    <>
      <GlobalStyle />
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

ReactDOM.render(<App />, document.getElementById('root'));

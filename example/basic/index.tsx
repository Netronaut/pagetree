import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Builder } from '@pagio/builder';
import { Builder } from '../../src';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components } from './catalog';
import { Header } from './components/Header';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState({});

  return (
    <>
      <GlobalStyle />
      <Header setShowPreview={setShowPreview} />
      {/* <div onClick={() => setShowPreview(prev => !prev)}>Toggle Preview</div> */}
      <Builder
        pageContent={pageContent}
        onChange={setPageContent}
        showPreview={showPreview}
        components={components}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

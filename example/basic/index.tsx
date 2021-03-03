import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components } from './catalog';

const App = () => {
  const [production, setProduction] = useState(false);
  const [pageContent, setPageContent] = useState({});

  return (
    <>
      <GlobalStyle />
      <div onClick={() => setProduction(prev => !prev)}>Toggle Production</div>
      <Builder
        pageContent={pageContent}
        onChange={setPageContent}
        showPreview={production}
        components={components}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

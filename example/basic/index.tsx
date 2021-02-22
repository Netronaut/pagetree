import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';

const App = () => {
  const [value, setValue] = useState({});

  return (
    <>
      <GlobalStyle />
      <Builder value={value} onChange={setValue} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Builder } from '@pagio/builder';
import { useState } from 'react';
import { GlobalStyle } from './globalStyle';
import { components, componentGroups } from './catalog';
import { Header } from './components/Header';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState({});
  const customHistory = createBrowserHistory();

  return (
    <>
      <Router history={customHistory}>
        <Header setShowPreview={setShowPreview} />
        <Switch>
          <Route exact path="/">
            <Builder
              pageContent={pageContent}
              onChange={setPageContent}
              showPreview={showPreview}
              components={components}
              componentGroups={componentGroups}
            />
          </Route>
          <Route path="/create-article">Create Article</Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

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
import { Nav, StyledLink } from './components/Header/componentsStyles';

const App = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [pageContent, setPageContent] = useState({});
  const customHistory = createBrowserHistory();

  return (
    <>
      <Router history={customHistory}>
        <Header setShowPreview={setShowPreview} />
        <Switch>
          <Route path="/pagebuilder">
            pagebuilder
            {/* <PagebuilderPage /> */}
          </Route>
          <Route path="/management">
            management
            {/* <ArticlePage /> */}
          </Route>
        </Switch>
        <Nav>
          <StyledLink to="/pagebuilder">Home</StyledLink>
          <StyledLink to="/management">Create Article</StyledLink>
        </Nav>
      </Router>
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

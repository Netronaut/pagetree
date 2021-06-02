import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalStyle } from './globalStyle';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Nav, StyledLink } from './components/ArticlePage/componentsStyles';
import { ArticlePage } from './components/ArticlePage';
import { PagebuilderPage } from './components/PagebuilderPage';

const App = () => {
  const customHistory = createBrowserHistory();

  return (
    <>
      <Router history={customHistory}>
        <Switch>
          <Route path="/management">
            <ArticlePage />
          </Route>
          <Route path="/pagebuilder">
            <PagebuilderPage />
          </Route>
        </Switch>
        <Nav>
          <StyledLink to="/management">Management</StyledLink>
          <StyledLink to="/pagebuilder">Pagebuilder</StyledLink>
        </Nav>
      </Router>
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

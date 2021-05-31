import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalStyle } from './globalStyle';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Nav, StyledLink } from './components/Header/componentsStyles';

const App = () => {
  const customHistory = createBrowserHistory();

  return (
    <>
      <Router history={customHistory}>
        <Switch>
          <Route path="/pagebuilder">
            Pagebuilder Page
            {/* <PagebuilderPage /> */}
          </Route>
          <Route path="/management">
            management
            {/* <ArticlePage /> */}
          </Route>
        </Switch>
        <Nav>
          <StyledLink to="/pagebuilder">Pagebuilder</StyledLink>
          <StyledLink to="/management">Management</StyledLink>
        </Nav>
      </Router>
      <GlobalStyle />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

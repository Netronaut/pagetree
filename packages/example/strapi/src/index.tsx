import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '@pagio/components';
import { PageBuilder } from './PageBuilder';
import { Dashboard } from './Dashboard';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/pagebuilder/:pageId">
          <PageBuilder />
        </Route>
        <Route path="/" exact component={Dashboard} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
    <GlobalStyle />
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

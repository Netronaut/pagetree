import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from './globalStyle';
import { PageManager, PageBuilder } from './components';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/pagebuilder/:pageId">
          <PageBuilder />
        </Route>
        <Route path="/" exact component={PageManager} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
    <GlobalStyle />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

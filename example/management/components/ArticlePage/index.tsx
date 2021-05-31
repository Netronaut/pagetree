import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { ArticlePage } from './components/ArticlePage';
// import { PagebuilderPage } from '../basic/index';
// import { GlobalStyle } from './globalStyle';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

export const ManagementPage = () => {
  const customHistory = createBrowserHistory();

  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/pagebuilder">
          pb
          {/* <PagebuilderPage /> */}
        </Route>
        <Route path="/management">
          mn
          {/* <ArticlePage /> */}
        </Route>
      </Switch>
      {/* <GlobalStyle /> */}
    </Router>
  );
};

ReactDOM.render(<ManagementPage />, document.getElementById('root'));

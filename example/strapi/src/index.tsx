import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { GlobalStyle } from './globalStyle';
import { PageBuilder, PageManager } from './components';
import { ManagementContext } from './utils/context';
import { apiUrls } from './apiUrls';
import { TPageData } from './types';

const App = () => {
  const [pages, setPages] = useState<TPageData[]>([]);

  const getPages = useCallback(async () => {
    try {
      const response = await axios.get(apiUrls.pages);
      setPages(response.data);
    } catch (error) {
      setPages(error);
    }
  }, []);

  useEffect(() => {
    getPages();
  }, []);

  return (
    <ManagementContext.Provider value={{ pages, setPages }}>
      <Router>
        <Switch>
          <Route path="/pagebuilder/:pageid" component={PageBuilder} />
          <Route path="/" exact component={PageManager} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </ManagementContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

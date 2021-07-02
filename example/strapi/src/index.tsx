import React from 'react';
import ReactDOM from 'react-dom';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalStyle } from './globalStyle';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageManager } from './components/PageManager/PageManager';
import { PagebuilderPage } from './components/PagebuilderPage';
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
          <Route path="/" exact>
            <PageManager />
          </Route>
          <Route path="/pagebuilder">
            <PagebuilderPage />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </ManagementContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

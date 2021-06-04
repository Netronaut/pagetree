import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalStyle } from './globalStyle';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav, StyledLink } from './components/ArticlePage/componentsStyles';
import { ArticlePage } from './components/ArticlePage';
import { PagebuilderPage } from './components/PagebuilderPage';
import { ManagementContext } from './utils/context';
import { apiUrls } from './apiUrls';

const App = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(apiUrls.aricles);
      setArticles(response.data);
    } catch (error) {
      setArticles(error);
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <ManagementContext.Provider value={{ articles }}>
      <Router>
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
        </Nav>
      </Router>
      <GlobalStyle />
    </ManagementContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

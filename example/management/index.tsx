import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalStyle } from './globalStyle';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav, StyledLink } from './components/ManagementPage/componentsStyles';
import { ManagementPage } from './components/ManagementPage';
import { PagebuilderPage } from './components/PagebuilderPage';
import { ManagementContext } from './utils/context';
import { apiUrls } from './apiUrls';

const App = () => {
  const [pages, setPages] = useState([]);

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
    <ManagementContext.Provider value={{ pages, changePages: setPages }}>
      <Router>
        <Switch>
          <Route path="/management">
            <ManagementPage />
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

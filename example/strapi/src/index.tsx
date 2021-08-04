import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import diff from 'changeset';

import { GlobalStyle } from './globalStyle';
import { PageManager, Header, PageBuilder } from './components';
import { ManagementContext } from './context';
import { apiUrls } from './apiUrls';
import { PageEntity } from './types';

const App = () => {
  const [pages, setPages] = useState<PageEntity[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    axios.get(apiUrls.pages).then((response) => setPages(response.data));
  }, []);

  const handlePageUpdate = (page: PageEntity) => {
    const updatePages = pages.map((item) => {
      if (item.id !== page.id) {
        return item;
      }
      return {
        ...page,
        history: (page.history || []).concat({
          date: new Date(),
          change: diff(page.pageContent, item.pageContent),
        }),
      };
    });
    setPages(updatePages);
    axios.put(`${apiUrls.pages}/${page?.id}`, updatePages);
  };

  return (
    <ManagementContext.Provider value={{ pages, setPages }}>
      <Router>
        <Header setShowPreview={setShowPreview} />
        <Switch>
          <Route path="/pagebuilder/:pageId">
            <PageBuilder showPreview={showPreview} onPageUpdate={handlePageUpdate} />
          </Route>
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

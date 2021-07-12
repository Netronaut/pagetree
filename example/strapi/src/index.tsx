import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import { GlobalStyle } from './globalStyle';
import { PageManager, Header, PageBuilder } from './components';
import { HistoryLogContext, ManagementContext } from './context';
import { apiUrls } from './apiUrls';
import { PageEntity } from './types';
import diff from 'changeset';

const App = () => {
  const [pages, setPages] = useState<PageEntity[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [historyLog, setHistoryLog] = useState([]);

  // const writeHistory = (pages: PageEntity[], oldPages: PageEntity[]) => {
  //   console.log(' pages---', pages, diff(pages, oldPages));
  //   setHistoryLog(diff(pages, oldPages));
  // };

  useEffect(() => {
    axios.get(apiUrls.pages).then((response) => setPages(response.data));
  }, []);

  const handlePageUpdate = (page: PageEntity) => {
    const { id, pageContent } = page;
    axios.put(`${apiUrls.pages}/${id}`, {
      pageContent,
    });
    const p = pages.map((item) => (item.id === id ? page : item));
    setPages(p);
    // pageContent && writeHistory(pages, p);
    setHistoryLog(diff(pages, p));
    console.log(diff(pages, p));
  };

  return (
    <ManagementContext.Provider value={{ pages, setPages }}>
      <HistoryLogContext.Provider value={{ historyLog, setHistoryLog }}>
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
      </HistoryLogContext.Provider>
    </ManagementContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

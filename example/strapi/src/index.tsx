import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import diff from 'changeset';
import { PageHistory, HistoryLogItem } from '@pagio/builder';

import { GlobalStyle } from './globalStyle';
import { PageManager, Header, PageBuilder, HistoryLog } from './components';
import { ManagementContext } from './context';
import { apiUrls } from './apiUrls';
import { PageEntity } from './types';

const App = () => {
  const [pages, setPages] = useState<PageEntity[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [historyLog, setHistoryLog] = useState<PageHistory>([]);

  useEffect(() => {
    axios.get(apiUrls.pages).then((response) => setPages(response.data));
  }, []);

  const handlePageUpdate = (page: PageEntity) => {
    const { id, pageContent } = page;
    axios.put(`${apiUrls.pages}/${id}`, {
      pageContent,
    });
    const mapedPages = pages.map((item) => (item.id === id ? page : item));
    setPages(mapedPages);
    const copyHistory: PageHistory = historyLog.slice();
    const historyLogItem: HistoryLogItem = {
      date: new Date().toUTCString().replace('GMT', ''),
      change: diff(pages, mapedPages),
    };
    copyHistory.push(historyLogItem);
    setHistoryLog(copyHistory);
  };

  return (
    <ManagementContext.Provider value={{ pages, setPages }}>
      <HistoryLog historyLog={historyLog} />
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

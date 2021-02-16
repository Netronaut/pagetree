import { Switch, Route } from 'react-router-dom';
import Pages from './screens/Pages';
import React, { useEffect } from 'react';
import usePages from './screens/Pages/hooks/usePages';
import Page from './screens/Pages/screens/Page';
import NotFound from './screens/NotFound';
import { Constructor } from './screens/Constructor';

const Routes = () => {
  const { pages, getPages } = usePages();

  useEffect(getPages, []);

  return (
    <Switch>
      <Route path="/" exact component={Pages} />
      <Route path={`/constructor/:id`} exact component={Constructor} />
      {pages.map(({ _id, route }) => (
        <Route
          key={route}
          exact
          path={`/${route}`}
          component={() => <Page id={_id} />}
        />
      ))}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
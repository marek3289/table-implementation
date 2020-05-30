import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { App, MainTemplate } from 'components';
import { constants } from 'utils';

const Root = () => {
  const { homeRoute, pageRoute } = constants;

  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={homeRoute} component={App} />
          <Route exact path={pageRoute} component={App} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Root;

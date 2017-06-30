
import React from 'react';
import { Switch, Route } from 'react-router';

import IndexPage from './routes/IndexPage'

export default () => (
    <Switch>
      <Route path="/" component={IndexPage} />
    </Switch>
);

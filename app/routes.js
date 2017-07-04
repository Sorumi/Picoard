import React from 'react';
import {Switch, Route} from 'react-router';

import MainPage from './routes/MainPage'
import IndexPage from './routes/IndexPage'
import ImagePage from './routes/ImagePage'

export default () => (
  <Switch>

    <MainPage>
    {/*<Route path="/" component={MainPage}>*/}
      <Route path="/images" component={IndexPage}/>
      <Route path="/image" component={ImagePage}/>
    {/*</Route>*/}
    </MainPage>

  </Switch>
);

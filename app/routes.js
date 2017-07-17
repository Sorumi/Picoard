import React from 'react';
import {Switch, Route, Router} from 'react-router';

import RootPage from './routes/RootPage'

import MainPage from './routes/MainPage'
import IndexPage from './routes/IndexPage'
import ImagePage from './routes/ImagePage'

import AboutPage from './routes/AboutPage'


const Main = ({ match }) => (
  <MainPage>
    <Route path={`${match.url}/images`} component={IndexPage}/>
    <Route path={`${match.url}/image`} component={ImagePage}/>
  </MainPage>
);

export default () => (
  <Switch>

    <RootPage>
      <Route path="/about" component={AboutPage}/>
      <Route path="/main" component={Main}/>

    </RootPage>

  </Switch>
);

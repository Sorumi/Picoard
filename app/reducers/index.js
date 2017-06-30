// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';

import window from './window';
import directories from './directories';
import images from './images';

const rootReducer = combineReducers({
  window,
  directories,
  images,
  counter,
  router,
});

export default rootReducer;

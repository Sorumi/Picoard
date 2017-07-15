// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import window from './window';
import directories from './directories';
import images from './images';
import image from './image'
import hint from './hint';

const rootReducer = combineReducers({
  window,
  directories,
  images,
  image,
  hint,
  router,
});

export default rootReducer;

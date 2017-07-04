// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import window from './window';
import directories from './directories';
import images from './images';
import image from './image'

const rootReducer = combineReducers({
  window,
  directories,
  images,
  image,
  router,
});

export default rootReducer;

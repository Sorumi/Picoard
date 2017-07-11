import React from 'react';
import Electron from 'electron';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
// import './app.global.css';

import './assets/scss/index.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

Electron.webFrame.setZoomLevelLimits(1, 1);


document.addEventListener('mousewheel', function(e) {
  console.log(e);
});

window.addEventListener('touchstart', (e) => {
  console.log('start');
})
document.addEventListener('touchmove', (e) => {
  console.log('move');
})
document.addEventListener('touchend', (e) => {
  console.log('end');
})
document.addEventListener('mouseup', (e) => {
  console.log('up');
})

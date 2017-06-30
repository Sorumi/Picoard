// @flow
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import rootSaga from '../sagas'
// import type { counterStateType } from '../reducers/counter';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
const enhancer = applyMiddleware(saga, router);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  saga.run(rootSaga);
  return store;

}

export default { configureStore, history };

import {call, put, select} from 'redux-saga/effects'


export function* changeWindow({payload: size}) {

  const {size: lastSize, sidebarWidth: lastSidebarWidth, offsetX: lastOffsetX} = yield select(state => state.window);
  const {location} = yield select(state => state.router);

  const ratio = (lastSidebarWidth + lastOffsetX) / lastSize.width;

  yield put({
    type: 'window/saveWindow',
    payload: {
      size,
      sidebarWidth: size.width * ratio - lastOffsetX,
    },
  });
  if (location.pathname === '/images') {
    yield put({
      type: 'images/refreshSize',
      payload: {}
    });
  } else if (location.pathname === '/image') {
    yield put({
      type: 'image/refreshSize',
      payload: {}
    });
  }
}


export function* changeOffsetX({payload: x}) {

  yield put({
    type: 'window/saveOffsetX',
    payload: x,
  });

  yield put({
    type: 'images/refreshSize',
    payload: {}
  });

}


import {call, put, select} from 'redux-saga/effects'
import {PINCH_MAX} from '../constants'

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

  yield put({
    type: 'images/refreshSizeWithoutColumn',
    payload: {}
  });

  if (location.pathname === '/image') {
    yield put({
      type: 'image/refreshSize',
      payload: {}
    });
  }
}


export function* changeOffsetX({payload: x}) {
  const {location} = yield select(state => state.router);

  yield put({
    type: 'window/saveOffsetX',
    payload: x,
  });

  yield put({
    type: 'images/refreshSizeWithoutColumn',
    payload: {}
  });

  if (location.pathname === '/image') {
    yield put({
      type: 'image/refreshSize',
      payload: {}
    });
  }

}

export function *pinchWindow({payload: {factor, total}}) {
  const {location} = yield select(state => state.router);

  if (location.pathname === '/images') {
    const {ratio} = yield select(state => state.images);
    let newRatio = ratio - factor / PINCH_MAX;
    if (newRatio > 1) {
      newRatio = 1;
    } else if (newRatio < 0) {
      newRatio = 0;
    }
    yield put({
      type: 'images/changeRatio',
      payload: newRatio
    });

  } else if (location.pathname === '/image') {
    const {ratio} = yield select(state => state.image);
    let newRatio = ratio - factor / PINCH_MAX;
    if (newRatio > 1) {
      newRatio = 1;
    } else if (newRatio < 0) {
      newRatio = 0;
    }
    yield put({
      type: 'image/changeRatio',
      payload: newRatio
    });
  }
  // console.log(factor, total);
}

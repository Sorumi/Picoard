import {call, put, select} from 'redux-saga/effects'
import {
  PINCH_MAX,
  SIDEBAR_MIN_RATIO,
  SIDEBAR_MAX_RATIO,
} from '../constants'

export function* changeWindow({payload: size}) {

  const {size: lastSize, sidebarWidth: lastSidebarWidth, offsetX: lastOffsetX} = yield select(state => state.window);
  const {location} = yield select(state => state.router);

  let ratio = (lastSidebarWidth + lastOffsetX) / lastSize.width;

  const sidebarWidth = size.width * ratio - lastOffsetX;

  let left = size.width * SIDEBAR_MIN_RATIO - sidebarWidth;
  let right = size.width * SIDEBAR_MAX_RATIO - sidebarWidth;


  yield put({
    type: 'window/saveWindow',
    payload: {
      size,
      sidebarWidth,
      bounds: {
        left,
        right,
      }
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

export function *pressKey({payload: key}) {

  console.log(key);
  const {location} = yield select(state => state.router);

  if (location.pathname === '/images') {
    switch (key) {
      case 'ArrowUp':
        yield put({
          type: 'directories/moveActiveDirectory',
          payload: 'prev'
        });
        break;
      case 'ArrowDown':
        yield put({
          type: 'directories/moveActiveDirectory',
          payload: 'next'
        });
        break;
      default:
    }

  } else if (location.pathname === '/image') {
    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        yield put({
          type: 'image/moveFetchImage',
          payload: 'prev'
        });
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        yield put({
          type: 'image/moveFetchImage',
          payload: 'next'
        });
        break;
      default:
    }

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
}

export function *focusWindow() {
  yield put({
    type: 'directories/loadDirectories',
    payload: {},
  });
  yield put({
    type: 'directories/reactiveDirectory',
    payload: {},
  });

  if (location.pathname === '/image') {
  
  }
}

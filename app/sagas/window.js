import {call, put, select} from 'redux-saga/effects'
import {push} from 'react-router-redux';
import * as directoriesService from '../service/directories';
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

  if (location.pathname === '/main/image') {
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

  if (location.pathname === '/main/image') {
    yield put({
      type: 'image/refreshSize',
      payload: {}
    });
  }

}

export function *pressKey({payload: key}) {

  // console.log(key);
  const {location} = yield select(state => state.router);

  if (location.pathname === '/main/images') {
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

  } else if (location.pathname === '/main/image') {
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

export function *focusWindow() {
  const {location} = yield select(state => state.router);

  yield put({
    type: 'directories/loadDirectories',
    payload: {},
  });

 if (location.pathname === '/main/image') {
    const {path, name} = yield select(state => state.image);
    const isExist = directoriesService.existDirectory(`${path}/${name}`);
    if (!isExist) {
      yield put(push('/main/images'));
    }
  }

  yield put({
    type: 'directories/reactiveDirectory',
    payload: {},
  });
}

import {call, put, select} from 'redux-saga/effects'


export function* changeWindow({payload: size}) {

  const {size: lastSize, sidebarWidth: lastSidebarWidth, offsetX: lastOffsetX} = yield select(state => state.window);
  const ratio = (lastSidebarWidth + lastOffsetX) / lastSize.width;

  yield put({
    type: 'window/saveWindow',
    payload: {
      size,
      sidebarWidth: size.width * ratio - lastOffsetX,
    },
  });
  yield put({
    type: 'images/refreshSize',
    payload: {}
  });
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


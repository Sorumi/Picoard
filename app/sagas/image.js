import {call, put, select} from 'redux-saga/effects'
import sizeOf from 'image-size';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

export function *changeRatio({payload: ratio}) {

  yield put({
    type: 'image/saveRatio',
    payload: ratio
  });

  yield put({
    type: 'image/refreshSize',
    payload: {}
  });
}


export function *refreshSize() {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  const {ratio, path} = yield select(state => state.image);

  let {width, height} = sizeOf(path);

  const wrapperWidth = size.width - sidebarWidth - offsetX;
  const wrapperHeight = size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT;


  const k = width / 0.7;
  const base = width - 0.3 * k;
  const imageWidth = k * ratio + base;

  yield put({
    type: 'image/saveSize',
    payload: imageWidth,
  });

}

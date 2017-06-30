import {call, put, select} from 'redux-saga/effects'
import * as imagesService from '../service/images';

export function* fetchImagesInPath({payload: path}) {

  const images = yield call(imagesService.fetchImagesInPath, path);

  yield put({
    type: 'images/saveImageAndPath',
    payload: {
      path,
      images,
    },
  });

}

export function *changeRatio({payload: ratio}) {

  yield put({
    type: 'images/saveRatio',
    payload: ratio
  });

  yield put({
    type: 'images/refreshSize',
    payload: {}
  });
}

export function *refreshSize() {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  const {ratio} = yield select(state => state.images);
  const maxWidth = size.width - sidebarWidth - offsetX - 40;
  const minWidth = (maxWidth + 20) / 5 - 20;
  const fitWidth = (maxWidth - minWidth) * ratio + minWidth;
  let column = Math.floor((maxWidth + 20) / (fitWidth + 20));
  column = column > 5 ? 5 : column;
  console.log(minWidth, maxWidth);

  yield put({
    type: 'images/saveSize',
    payload: {
      column,
      imageWidth: fitWidth
    },
  });
}

import {call, put, select} from 'redux-saga/effects'
import sizeOf from 'image-size';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT, MIN_WIDTH} from '../constants'

import Electron from 'electron';
const screen = Electron.screen.getPrimaryDisplay();
const {width: screenWidth, height: screenHeight} = screen.size;

export function *fetchImage({payload: path}) {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  let {width, height} = sizeOf(path);

  const wrapperWidth = size.width - sidebarWidth - offsetX - 40;
  const wrapperHeight = size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT - 40;

  const maxWidth = width > screenWidth || height > screenHeight ? width : width * 2;
  const minWidth = width > MIN_WIDTH || height > MIN_WIDTH ? MIN_WIDTH : width;

  const k = maxWidth - minWidth;
  
  const wrapperRatio = wrapperWidth / wrapperHeight;
  const imageRatio = width / height;

  let fitWidth;
  if (width > wrapperWidth || height > wrapperHeight) {
    fitWidth = imageRatio > wrapperRatio ? wrapperWidth : wrapperHeight * imageRatio
  } else {
    fitWidth = width
  }

  // console.log(width, wrapperWidth, height, wrapperHeight, fitWidth);

  const ratio = (fitWidth - minWidth ) / k;

  yield put({
    type: 'image/savePath',
    payload: path,
  });
  yield put({
    type: 'image/saveRatio',
    payload: ratio
  });
  yield put({
    type: 'image/saveSize',
    payload: fitWidth,
  });
}


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

  const {ratio, path} = yield select(state => state.image);

  let {width, height} = sizeOf(path);

  const maxWidth = width > screenWidth || height > screenHeight ? width : width * 2;
  const minWidth = width > MIN_WIDTH || height > MIN_WIDTH ? MIN_WIDTH : width;

  const k = maxWidth - minWidth;
  const imageWidth = k * ratio + minWidth;

  yield put({
    type: 'image/saveSize',
    payload: imageWidth,
  });

}

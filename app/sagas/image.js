import {call, put, select} from 'redux-saga/effects'
import sizeOf from 'image-size';
import * as imagesService from '../service/images';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT, MIN_WIDTH, PER_RATIO} from '../constants'

import Electron from 'electron';
const screen = Electron.screen.getPrimaryDisplay();
const {width: screenWidth, height: screenHeight} = screen.size;

export function *moveFetchImage({payload: type}) {
  const {currentIndex, path} = yield select(state => state.image);
  const images = yield call(imagesService.fetchImagesInPath, path);
  if (!images) return;

  const length = images.length;
  if (length === 0) return;

  let newIndex = currentIndex;

  if (type === 'prev') {
    newIndex = (newIndex - 1 + length) % length;

  } else if (type === 'next') {
    newIndex = (newIndex + 1) % length;
  }

  const name = images[newIndex];

  yield *fetchImage({payload: {path, name}});
}

export function *fetchImage({payload: {path, name}}) {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);

  const images = yield call(imagesService.fetchImagesInPath, path);
  const index = images.indexOf(name);

  const totalPath = `${path}/${name}`;
  let {width, height} = sizeOf(totalPath);

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

  let fitHeight = fitWidth / imageRatio;
  // console.log('width:', width, wrapperWidth, 'height: ', height, wrapperHeight, 'fit: ',fitWidth);

  const marginTop = (wrapperHeight - fitHeight) / 2;
  const ratio = (fitWidth - minWidth ) / k;

  yield put({
    type: 'image/savePathAndIndex',
    payload: {
      path,
      name,
      index,
    }
  });
  yield put({
    type: 'image/saveRatio',
    payload: ratio
  });
  yield put({
    type: 'image/saveSize',
    payload: {
      imageWidth: fitWidth,
      imageHeight: fitHeight,
      marginTop
    },
  });
}

export function *normalRatio({payload: type}) {

  const {ratio} = yield select(state => state.image);

  let newRatio = ratio;
  if (type === 'large') {
    newRatio = ( ratio + PER_RATIO) > 1 ? 1 : ratio + PER_RATIO;

  } else if (type === 'small') {
    newRatio = ( ratio - PER_RATIO) < 0 ? 0 : ratio - PER_RATIO;
  }

  yield put({
    type: 'image/changeRatio',
    payload: newRatio
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

  const {ratio, path, name} = yield select(state => state.image);
  const {size} = yield select(state => state.window);

  const totalPath = `${path}/${name}`;
  let {width, height} = sizeOf(totalPath);

  const maxWidth = width > screenWidth || height > screenHeight ? width : width * 2;
  const minWidth = width > MIN_WIDTH || height > MIN_WIDTH ? MIN_WIDTH : width;

  const k = maxWidth - minWidth;
  const imageWidth = k * ratio + minWidth;

  const imageRatio = width / height;
  const wrapperHeight = size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT - 40;
  const imageHeight = imageWidth / imageRatio;


  const marginTop = wrapperHeight > imageHeight ? (wrapperHeight - imageHeight) / 2 : 0;

  yield put({
    type: 'image/saveSize',
    payload: {
      imageWidth,
      marginTop
    },
  });

}

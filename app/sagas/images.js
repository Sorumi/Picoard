import {call, put, select} from 'redux-saga/effects'
import * as imagesService from '../service/images';
import sizeOf from 'image-size';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

export function* fetchImagesInPath({payload: path}) {

  yield put({
    type: 'images/saveShowImages',
    payload: {
      isScroll: false,
      lastIndex: 0,
      columnHeight: [],
      columnImages: [],
    },
  });

  if (path === null) {
    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path: null,
        images: [],
      },
    });

  } else {

    const images = yield call(imagesService.fetchImagesInPath, path);


    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path,
        images,
      },
    });
  }

  const {size} = yield select(state => state.window);
  yield put({
    type: 'images/saveListHeight',
    payload: size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT,
  });

  yield *refreshSize();
}

export function *normalRatio({payload: type}) {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  const {ratio, imageWidth, column} = yield select(state => state.images);
  const listWidth = size.width - sidebarWidth - offsetX;

  const maxWidth = listWidth - 40;
  const minWidth = (maxWidth + 20) / 5 - 20;

  let newImageWidth = imageWidth;
  if (type === 'large') {
    const newColumn = column === 1 ? 1 : column - 1;
    const newColumnWidth = (maxWidth + 20) / newColumn - 20;
    const columnWidth = (maxWidth + 20) / column - 20;
    newImageWidth = imageWidth < columnWidth ? columnWidth : newColumnWidth;

  } else if (type === 'small') {
    const newColumn = column === 5 ? 5 : column + 1;
    newImageWidth = (maxWidth + 20) / newColumn - 20;
  }

  const newRatio = ( newImageWidth - minWidth ) / (maxWidth - minWidth);

  yield put({
    type: 'images/changeRatio',
    payload: newRatio
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

export function *refreshSizeWithoutColumn() {
  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  const {images, ratio, column, imageWidth, listHeight, showImages} = yield select(state => state.images);
  const listWidth = size.width - sidebarWidth - offsetX;
  const maxWidth = listWidth - 40;
  const minWidth = (maxWidth + 20) / 5 - 20;
  const newImageWidth = (maxWidth - minWidth) * ratio + minWidth;

  yield put({
    type: 'images/saveSize',
    payload: {
      column,
      imageWidth: newImageWidth,
    },
  });

  // calculate new column height
  const {lastIndex, columnHeight, columnImages} = showImages;
  for (let i = 0; i < column; i++) {
    let length = columnImages[i] ? columnImages[i].length : 0;
    columnHeight[i] = (columnHeight[i] - 20 * (length - 1)) / imageWidth * newImageWidth + 20 * (length - 1);
  }

  yield put({
    type: 'images/saveShowImages',
    payload: {
      lastIndex,
      columnHeight,
      columnImages,
    },
  });

  // load more images
  if (images.length >= lastIndex &&
    columnHeight.filter(h => h < listHeight).length > 0) {
    yield *loadMoreShowImages();
  }


  // is scroll
  const clientHeight = size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT;
  let isScroll = false;
  if (columnHeight.filter(h => h > clientHeight).length > 0) {
    isScroll = true;
  }
  yield put({
    type: 'images/saveIsScroll',
    payload: isScroll,
  });
}

export function *refreshSize() {

  const {size, sidebarWidth, offsetX} = yield select(state => state.window);
  const {ratio} = yield select(state => state.images);
  const listWidth = size.width - sidebarWidth - offsetX;
  const maxWidth = listWidth - 40;
  const minWidth = (maxWidth + 20) / 5 - 20;
  const imageWidth = (maxWidth - minWidth) * ratio + minWidth;
  let column = Math.floor((maxWidth + 20) / (imageWidth + 20));


  column = column > 5 ? 5 : column;

  yield put({
    type: 'images/saveSize',
    payload: {
      column,
      imageWidth,
    },
  });

  yield *loadShowImages();
}


export function *loadShowImages() {

  const {path, column, images, imageWidth, listHeight} = yield select(state => state.images);
  let columnHeight = [];
  let columnImages = [];
  let lastIndex = 0;


  for (let i = 0; i < column; i++) {
    columnHeight.push(0);
    columnImages.push([]);
  }

  let currentIndex = 0;

  for (let i = currentIndex; i < images.length; i++) {
    const name = images[i];
    let file = `${path}/${name}`;
    let dimensions = sizeOf(file);
    let imageHeight = imageWidth / dimensions.width * dimensions.height;
    let index = columnHeight.indexOf(Math.min.apply(Math, columnHeight));
    columnHeight[index] += (imageHeight + 20);
    columnImages[index].push(name);
    currentIndex++;
    if (currentIndex >= lastIndex &&
      columnHeight.filter(h => h < listHeight).length === 0) {
      break;
    }
  }

  // is scroll
  const {size} = yield select(state => state.window);
  const clientHeight = size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT;
  let isScroll = false;
  if (columnHeight.filter(h => h > clientHeight).length > 0) {
    isScroll = true;
  }
  yield put({
    type: 'images/saveIsScroll',
    payload: isScroll,
  });

  yield put({
    type: 'images/saveShowImages',
    payload: {
      lastIndex: currentIndex,
      columnHeight,
      columnImages,
    },
  });
}

export function *loadMoreShowImages() {
  const {path, column, images, imageWidth, listHeight, showImages} = yield select(state => state.images);
  const {size} = yield select(state => state.window);

  const newListHeight = listHeight + size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT;
  yield put({
    type: 'images/saveListHeight',
    payload: newListHeight,
  });

  let columnHeight = showImages.columnHeight;
  let columnImages = showImages.columnImages;
  let lastIndex = showImages.lastIndex;

  let currentIndex = lastIndex;

  for (let i = currentIndex; i < images.length; i++) {
    const name = images[i];
    let file = `${path}/${name}`;
    let dimensions = sizeOf(file);
    let imageHeight = imageWidth / dimensions.width * dimensions.height;
    let index = columnHeight.indexOf(Math.min.apply(Math, columnHeight));
    columnHeight[index] += (imageHeight + 20);
    columnImages[index].push(name);
    currentIndex++;
    if (currentIndex >= lastIndex &&
      columnHeight.filter(h => h < newListHeight).length === 0) {
      break;
    }
  }

  const isScroll = showImages.isScroll;

  yield put({
    type: 'images/saveShowImages',
    payload: {
      isScroll,
      lastIndex: currentIndex,
      columnHeight,
      columnImages,
    },
  });
}

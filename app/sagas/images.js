import {call, put, select} from 'redux-saga/effects'
import * as imagesService from '../service/images';
import sizeOf from 'image-size';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

export function* fetchImagesInPath({payload: path}) {

  const images = yield call(imagesService.fetchImagesInPath, path);

  yield put({
    type: 'images/saveImageAndPath',
    payload: {
      path,
      images,
    },
  });


  const {size} = yield select(state => state.window);
  yield put({
    type: 'images/saveListHeight',
    payload: size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT,
  });

  yield *loadShowImages();
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
  const listWidth = size.width - sidebarWidth - offsetX;
  const maxWidth = listWidth - 40;
  const minWidth = (maxWidth + 20) / 5 - 20;
  const imageWidth = (maxWidth - minWidth) * ratio + minWidth;
  let column = Math.floor((maxWidth + 20) / (imageWidth + 20));


  column = column > 5 ? 5 : column;
  const imageMargin = (listWidth - imageWidth * column ) / (column + 1);
  
  yield put({
    type: 'images/saveSize',
    payload: {
      column,
      imageWidth,
      imageMargin,
    },
  });

  yield *loadShowImages();

}


export function *loadShowImages() {
  const {path, column, images, imageWidth, listHeight, showImages} = yield select(state => state.images);
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

  yield put({
    type: 'images/saveShowImages',
    payload: {
      lastIndex: currentIndex,
      columnHeight,
      columnImages,
    },
  });
}

import {call, put, select} from 'redux-saga/effects'
import {push} from 'react-router-redux';
import * as imagesService from '../service/images';
import * as directoriesService from '../service/directories';
import sizeOf from 'image-size';
import {PINCH_MAX, TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

export function *pinchWindow({payload: factor}) {
  const {ratio} = yield select(state => state.images);
  let newRatio = ratio - factor / PINCH_MAX;
  if (newRatio > 1) {
    newRatio = 1;
  } else if (newRatio < 0) {
    newRatio = 0;
  }
  yield *changeRatio({payload: newRatio});

}

export function *selectImage({payload: name}) {

  yield put({
    type: 'images/saveSelectImages',
    payload: [name]
  })

}

export function *addSelectImage({payload: name}) {
  const {images, selectImages} = yield select(state => state.images);

  let newSelectImages = [...selectImages];
  const index = newSelectImages.indexOf(name);
  if (index === -1) {
    newSelectImages.push(name);
  }

  yield put({
    type: 'images/saveSelectImages',
    payload: newSelectImages,
  })
}

export function *toggleSelectImage({payload: name}) {
  const {images, selectImages} = yield select(state => state.images);

  let newSelectImages = [...selectImages];
  const index = newSelectImages.indexOf(name);
  if (index === -1) {
    newSelectImages.push(name);
  } else {
    newSelectImages.splice(index, 1);
  }

  yield put({
    type: 'images/saveSelectImages',
    payload: newSelectImages,
  })
}

export function *selectAllImages() {
  const {images} = yield select(state => state.images);

  yield put({
    type: 'images/saveSelectImages',
    payload: [...images],
  })
}

export function *deselectAllImages() {

  yield put({
    type: 'images/saveSelectImages',
    payload: [],
  })
}

export function *canAll() {
  const copyAndDelete = yield *canCopyAndDelete();
  const paste = yield *canPaste();
  const selectAll = yield *canSelectAll();

  const menu = {
    copy: copyAndDelete,
    paste,
    delete: copyAndDelete,
    selectAll,
  };
  console.log(menu);
  yield put({
    type: 'images/saveMenu',
    payload: menu
  });
}

function *canCopyAndDelete() {
  const {location} = yield select(state => state.router);

  if (location.pathname === '/main/image') {
    return true;
  } else if (location.pathname === '/main/images') {
    const {selectImages} = yield select(state => state.images);
    return selectImages.length > 0
  }
  return false;
}

function *canPaste() {
  const {location} = yield select(state => state.router);

  if (location.pathname === '/main/images') {
    const {path, exist} = yield select(state => state.images);
    if (path === null || !exist) return false;

    const files = yield call(imagesService.getPasteFilesFromClipboard);

    if (files.length === 0) {
      const image = yield call(imagesService.getImageFromClipboard);
      return image !== false;

    } else {
      let can = false;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        can = yield call(imagesService.isImage, file.path, file.name);
        if (can) break;
      }
      return can;
    }
  }
  return false;
}

function *canSelectAll() {
  const {location} = yield select(state => state.router);
  if (location.pathname === '/main/images') {
    const {images} = yield select(state => state.images);
    return images.length > 0
  }
  return false;
}

export function *confirmDeleteImages() {
  const {location} = yield select(state => state.router);

  let files = [];
  if (location.pathname === '/main/images') {
    const {path, selectImages} = yield select(state => state.images);
    if (selectImages.length === 0) return;
    selectImages.forEach((file) => {
      files.push(`${path}/${file}`)
    });

  } else if (location.pathname === '/main/image') {
    const {path, name} = yield select(state => state.image);
    files.push(`${path}/${name}`)
  }

  yield put({
    type: 'hint/saveDeleteConfirm',
    payload: {
      show: true,
      files,
    },
  });
}

export function *deleteImages() {
  // const {path} = yield select(state => state.images);
  const {deleteConfirm} = yield select(state => state.hint);
  let {files} = deleteConfirm;

  yield call(imagesService.deleteFiles, files);
  yield put({
    type: 'hint/saveDeleteConfirm',
    payload: {
      show: false,
      files: [],
    },
  });

  yield *refresh();
}

export function *copyImages() {
  const {location} = yield select(state => state.router);

  let files = [];
  if (location.pathname === '/main/images') {
    const {path, selectImages} = yield select(state => state.images);
    selectImages.forEach((file) => {
      files.push(`${path}/${file}`)
    });

  } else if (location.pathname === '/main/image') {
    const {path, name} = yield select(state => state.image);
    files.push(`${path}/${name}`)
  }

  yield call(imagesService.setCopyFilesToClipboard, files);
}

export function *pasteImages() {
  const {path, exist} = yield select(state => state.images);
  if (path === null || !exist) return;

  const files = yield call(imagesService.getPasteFilesFromClipboard);

  if (files.length === 0) {
    // is not file
    const image = yield call(imagesService.getImageFromClipboard);
    if (image) {
      yield call(imagesService.pasteImage, image, path);

      yield *refresh();
    }
  } else {
    // is file
    yield *pasteImageFiles({payload: files});
  }
}

export function *pasteImageFiles({payload: files}) {
  const {path, exist} = yield select(state => state.images);
  if (path === null || !exist) return;

  let errorTarget = [];
  for (let index in files) {
    const file = files[index];
    const isImage = yield call(imagesService.isImage, file.path, file.name);
    const target = `${path}/${file.name}`;
    if (isImage) {
      const isExist = yield call(imagesService.isExist, target);
      if (isExist) {
        errorTarget.push(target);
      } else {
        yield call(imagesService.pasteFile, file.path, target);
      }
    }
  }

  yield *refresh();

  if (errorTarget.length > 0) {
    // console.log(errorTarget);
    yield put({
      type: 'hint/saveExistWarning',
      payload: {
        show: true,
        files: errorTarget,
      },
    });
  }
}

// refresh after delete & paste
function *refresh() {
  const {location} = yield select(state => state.router);
  yield put({
    type: 'directories/loadDirectories',
    payload: {},
  });
  yield *refetchImages();
  if (location.pathname !== '/main/images') {
    yield put(push('/main/images'));
  }
}

export function *refetchImages() {
  const {path, selectImages} = yield select(state => state.images);

  const exist = yield call(directoriesService.existDirectory, path);

  if (!exist) {
    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path,
        exist,
        images: [],
      },
    });

  } else {
    const images = yield call(imagesService.fetchImagesInPath, path);

    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path,
        exist,
        images,
      },
    });

    // Check select images
    const newSelectImages = selectImages.filter((image) => images.indexOf(image) !== -1);

    yield put({
      type: 'images/saveSelectImages',
      payload: newSelectImages
    });

  }

  const {size} = yield select(state => state.window);
  yield put({
    type: 'images/saveListHeight',
    payload: size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT,
  });

  yield *refreshSize();
}

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

  // Clear select images
  yield put({
    type: 'images/saveSelectImages',
    payload: []
  });

  const exist = yield call(directoriesService.existDirectory, path);

  if (!exist) {
    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path,
        exist,
        images: [],
      },
    });

  } else {
    const images = yield call(imagesService.fetchImagesInPath, path);

    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path,
        exist,
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

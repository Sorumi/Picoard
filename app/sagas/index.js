/**
 * Created by Sorumi on 17/4/16.
 */
import {takeEvery, takeLatest} from 'redux-saga/effects'

import * as windowEffect from './window';
import * as directoriesEffect from './directories';
import * as imagesEffect from './images';
import * as imageEffect from './image';

function* saga() {
  yield takeLatest("window/changeWindow", windowEffect.changeWindow);
  yield takeLatest("window/changeOffsetX", windowEffect.changeOffsetX);
  yield takeLatest("window/pressKey", windowEffect.pressKey);
  yield takeLatest("window/pinchWindow", windowEffect.pinchWindow);
  yield takeLatest("window/focusWindow", windowEffect.focusWindow);

  yield takeLatest("directories/addDirectory", directoriesEffect.addDirectory);
  yield takeLatest("directories/removeDirectory", directoriesEffect.removeDirectory);
  yield takeLatest("directories/loadDirectories", directoriesEffect.loadDirectories);
  yield takeLatest("directories/activeDirectory", directoriesEffect.activeDirectory);
  yield takeLatest("directories/reactiveDirectory", directoriesEffect.reactiveDirectory);
  yield takeLatest("directories/moveActiveDirectory", directoriesEffect.moveActiveDirectory);
  yield takeLatest("directories/sortDirectories", directoriesEffect.sortDirectories);
  yield takeLatest("directories/editDirectory", directoriesEffect.editDirectory);
  yield takeLatest("directories/saveDirectory", directoriesEffect.saveDirectory);

  yield takeLatest("images/activeImage", imagesEffect.activeImage);
  yield takeLatest("images/addActiveImage", imagesEffect.addActiveImage);
  yield takeLatest("images/pasteImages", imagesEffect.pasteImages);
  yield takeLatest("images/fetchImagesInPath", imagesEffect.fetchImagesInPath);
  yield takeLatest("images/normalRatio", imagesEffect.normalRatio);
  yield takeLatest("images/changeRatio", imagesEffect.changeRatio);
  yield takeLatest("images/refreshSize", imagesEffect.refreshSize);
  yield takeLatest("images/refreshSizeWithoutColumn", imagesEffect.refreshSizeWithoutColumn);
  yield takeLatest("images/loadShowImages", imagesEffect.loadShowImages);
  yield takeLatest("images/loadMoreShowImages", imagesEffect.loadMoreShowImages);

  yield takeLatest("image/moveFetchImage", imageEffect.moveFetchImage);
  yield takeLatest("image/fetchImage", imageEffect.fetchImage);
  yield takeLatest("image/normalRatio", imageEffect.normalRatio);
  yield takeLatest("image/changeRatio", imageEffect.changeRatio);
  yield takeLatest("image/refreshSize", imageEffect.refreshSize);
}

export default saga;

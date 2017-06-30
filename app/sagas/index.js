/**
 * Created by Sorumi on 17/4/16.
 */
import {takeEvery, takeLatest} from 'redux-saga/effects'

import * as windowEffect from './window';
import * as directoriesEffect from './directories';
import * as imagesEffect from './images';

function* saga() {
  yield takeLatest("window/changeWindow", windowEffect.changeWindow);
  yield takeLatest("window/changeOffsetX", windowEffect.changeOffsetX)

  yield takeLatest("directories/addDirectory", directoriesEffect.addDirectory);
  yield takeLatest("directories/loadDirectories", directoriesEffect.loadDirectories);
  yield takeLatest("directories/activeDirectory", directoriesEffect.activeDirectory);
  yield takeLatest("directories/sortDirectories", directoriesEffect.sortDirectories);

  yield takeLatest("images/fetchImagesInPath", imagesEffect.fetchImagesInPath);
  yield takeLatest("images/changeRatio", imagesEffect.changeRatio);
  yield takeLatest("images/refreshSize", imagesEffect.refreshSize);

}

export default saga;

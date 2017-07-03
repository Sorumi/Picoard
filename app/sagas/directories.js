import {call, put, select} from 'redux-saga/effects'
import * as directoriesService from '../service/directories';


export function* addDirectory({payload: path}) {
  yield call(directoriesService.addDirectory, path);

  yield put({
    type: 'directories/loadDirectories',
    payload: {},
  });
}

export function* removeDirectory({payload: index}) {
  yield call(directoriesService.removeDirectory, index);

  yield *loadDirectories();

  let newCurrentDirIndex;
  const {currentDirIndex, directories} = yield select(state => state.directories);

  if (currentDirIndex === index && index === directories.length) {
    newCurrentDirIndex = directories.length-1;
  } else if (currentDirIndex === index) {
    newCurrentDirIndex = currentDirIndex
  } else if (currentDirIndex >= index) {
    newCurrentDirIndex = currentDirIndex - 1;
  } else {
    return;
  }
  yield put({
    type: 'directories/activeDirectory',
    payload: newCurrentDirIndex,
  });
}

export function* loadDirectories() {
  // Store.clear()
  const directories = yield call(directoriesService.loadDirectories);
  console.log(directories);
  yield put({
    type: 'directories/saveDirectories',
    payload: directories,
  });
}

export function* activeDirectory({payload: index}) {
  yield put({
    type: 'directories/saveCurrentDirIndex',
    payload: index,
  });
  const directory = yield call(directoriesService.getDirectoryByIndex, index);

  if (directory) {
    yield put({
      type: 'images/fetchImagesInPath',
      payload: directory.path,
    })
  }
}

export function* sortDirectories({payload: {oldIndex, newIndex}}) {
  yield call(directoriesService.sortDirectories, oldIndex, newIndex);

  yield *loadDirectories();

  let newCurrentDirIndex;
  const {currentDirIndex} = yield select(state => state.directories);
  if (currentDirIndex === oldIndex) {
    newCurrentDirIndex = newIndex;
  } else if (currentDirIndex >= newIndex && currentDirIndex < oldIndex) {
    newCurrentDirIndex = currentDirIndex + 1;
  } else if (currentDirIndex <= newIndex && currentDirIndex > oldIndex) {
    newCurrentDirIndex = currentDirIndex - 1;
  } else {
    return;
  }
  yield put({
    type: 'directories/saveCurrentDirIndex',
    payload: newCurrentDirIndex,
  });
}

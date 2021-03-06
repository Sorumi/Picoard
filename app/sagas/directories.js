import {call, put, select} from 'redux-saga/effects'
import * as directoriesService from '../service/directories';
import {push} from 'react-router-redux'

export function* addDirectory({payload: path}) {
  const {currentDirIndex, directories} = yield select(state => state.directories);
  const isSuccess = yield call(directoriesService.addDirectory, path);

  if (!isSuccess) return;

  yield put({
    type: 'directories/loadDirectories',
    payload: {},
  });

  if (!directories || directories.length === 0) {
    yield *activeDirectory({payload: currentDirIndex});
  }
}

export function* removeDirectory({payload: index}) {
  yield call(directoriesService.removeDirectory, index);

  yield *loadDirectories();

  let newCurrentDirIndex;
  const {currentDirIndex, directories} = yield select(state => state.directories);

  if (currentDirIndex === index && index === directories.length && index === 0) {

    newCurrentDirIndex = 0;
    yield put({
      type: 'images/saveImageAndPath',
      payload: {
        path: null,
        exist: false,
        images: [],
      },
    });
  } else if (currentDirIndex === index && index === directories.length) {
    newCurrentDirIndex = currentDirIndex - 1;
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
  const directories = yield call(directoriesService.loadDirectories);
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
    });


    const {location} = yield select(state => state.router);
    if (location.pathname !== '/main/images') {
      yield put(push('/main/images'));
    }
  }
}

export function *reactiveDirectory() {
  const {currentDirIndex} = yield select(state => state.directories);

  const directory = yield call(directoriesService.getDirectoryByIndex, currentDirIndex);

  if (directory) {

    yield put({
      type: 'images/refetchImages',
      payload: directory.path,
    });
  }
}

export function *moveActiveDirectory({payload: type}) {
  const {currentDirIndex, directories} = yield select(state => state.directories);
  const length = directories.length;

  if (length === 0) return;

  let newIndex = currentDirIndex;

  if (type === 'prev') {
    newIndex = (newIndex - 1 + length) % length;

  } else if (type === 'next') {
    newIndex = (newIndex + 1) % length;
  }
  yield *activeDirectory({payload: newIndex});
}

export function* sortDirectories({payload: {oldIndex, newIndex}}) {
  yield call(directoriesService.sortDirectories, oldIndex, newIndex);

  yield *loadDirectories();
  const {currentDirIndex, editDirIndex} = yield select(state => state.directories);

  let newCurrentDirIndex = null;
  if (currentDirIndex === oldIndex) {
    newCurrentDirIndex = newIndex;
  } else if (currentDirIndex >= newIndex && currentDirIndex < oldIndex) {
    newCurrentDirIndex = currentDirIndex + 1;
  } else if (currentDirIndex <= newIndex && currentDirIndex > oldIndex) {
    newCurrentDirIndex = currentDirIndex - 1;
  }

  if (newCurrentDirIndex !== null) {
    yield put({
      type: 'directories/saveCurrentDirIndex',
      payload: newCurrentDirIndex,
    });
  }

  let newEditDirIndex = null;
  if (editDirIndex === null) {

  } else if (editDirIndex === oldIndex) {
    newEditDirIndex = newIndex;
  } else if (editDirIndex >= newIndex && editDirIndex < oldIndex) {
    newEditDirIndex = editDirIndex + 1;
  } else if (editDirIndex <= newIndex && editDirIndex > oldIndex) {
    newEditDirIndex = editDirIndex - 1;
  }

  if (newEditDirIndex !== null) {
    yield put({
      type: 'directories/saveEditDirIndex',
      payload: newEditDirIndex,
    });
  }
}

export function *editDirectory({payload: index}) {
  console.log(index);
  const directory = yield call(directoriesService.getDirectoryByIndex, index);

  yield put({
    type: 'directories/saveEditDirIndex',
    payload: index
  });

  yield put({
    type: 'directories/saveEditItem',
    payload: {
      color: directory.color,
      name: directory.name,
    }
  });
}

export function *saveDirectory() {
  const {editDirIndex, editItem} = yield select(state => state.directories);
  yield call(directoriesService.saveDirectory, editDirIndex, editItem.color, editItem.name);
  yield put({
    type: 'directories/saveEditDirIndex',
    payload: null
  });
  yield put({
    type: 'directories/saveEditItem',
    payload: {
      color: null,
      name: null,
    }
  });


  yield *loadDirectories();
}

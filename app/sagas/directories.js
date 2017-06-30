import {call, put, select} from 'redux-saga/effects'
import * as directoriesService from '../service/directories';

export function* addDirectory({payload: path}) {
    // console.log(path, path.substr(path.lastIndexOf('/') + 1));
    yield call(directoriesService.addDirectory, path);

    yield put({
        type: 'directories/loadDirectories',
        payload: {},
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

export function *activeDirectory({payload: index}) {
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


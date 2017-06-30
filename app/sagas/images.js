import {call, put, select} from 'redux-saga/effects'
import * as imagesService from '../service/images';

export function* fetchImagesInPath({payload: path}) {

    const images = yield call(imagesService.fetchImagesInPath, path);

    yield put({
        type: 'images/saveImageAndPath',
        payload: {
            path,
            images,
        },
    });

}


import {call, put, select} from 'redux-saga/effects'
import * as imagesService from '../service/images';

export function *init() {
  yield call(imagesService.initNextImage);
}

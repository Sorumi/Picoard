// import request from '../utils/request';
import {remote} from 'electron';
const fs = remote.require('fs');

export function fetchImagesInPath(path) {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path)
      .filter(file =>
        file.toLowerCase().match(/\.(jpe?g|png|gif)$/)
      );
  }
}

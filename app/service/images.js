
import {remote} from 'electron';
const fs = remote.require('fs');

import {IMAGE_MATCH} from '../constants'

export function fetchImagesInPath(path) {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path)
      .filter(file =>
        file.toLowerCase().match(IMAGE_MATCH)
      );
  }
}

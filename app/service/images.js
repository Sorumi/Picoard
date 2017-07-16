import Store from '../utils/store';
import {remote, clipboard} from 'electron';
const $ = require('nodobjc');
const fs = remote.require('fs');


import {IMAGE_MATCH, IMAGE_PREFIX} from '../constants'

$.framework('Foundation');
$.framework('AppKit');

export function isExist(path) {
  return fs.existsSync(path);
}

export function isImage(path, name) {
  return fs.existsSync(path) && name.toLowerCase().match(IMAGE_MATCH);
}

export function fetchImagesInPath(path) {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path)
      .filter(file =>
        file.toLowerCase().match(IMAGE_MATCH)
      );
  }
}

export function getImageFromClipboard() {
  const image = clipboard.readImage();
  const isImage = !image.isEmpty();
  // console.log(isImage);
  return isImage ? image.toPNG() : false;
}

export function getPasteFilesFromClipboard() {

  let pb = $.NSPasteboard('generalPasteboard');

  let files = [];
  let array = pb('pasteboardItems');
  let length = array('count');
  for (let i = 0; i < length; i++) {
    let item = array('objectAtIndex', i);
    let pathString = item('stringForType', $('public.file-url'));
    let tmpURL = $.NSURL('URLWithString', pathString);
    if (typeof tmpURL === "function") {
      let path = tmpURL('path')('UTF8String');
      let name = path.replace(/^.*[\\\/]/, '');
      files.push({
        path,
        name,
      });
    }
  }

  return files;
}


export function setCopyFilesToClipboard(files) {
  let pasteboard = $.NSPasteboard('generalPasteboard');
  let changeCount = pasteboard('clearContents');
  let array = $.NSMutableArray('alloc')('init');

  files.forEach((file) => {
    let string = $.NSString('stringWithUTF8String', file);
    array('addObject', $.NSURL('alloc')('initFileURLWithPath', string));
  });
  pasteboard('writeObjects', array);
}


export function pasteFile(source, target) {
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
}

export function pasteImage(buffer, path) {
  let name = getNextImage();

  fs.writeFile(`${path}/${name}.png`, buffer, function (err) {
    // console.log(err);
  });
}

export function deleteFiles(files) {
  files.forEach((file) => {
    fs.unlinkSync(file);
  })
}

export function initNextImage() {
  let has = Store.has('nextImage');
  if (!has) {
    Store.set('nextImage', 0);
  }
}

export function getNextImage() {
  let number = Store.get('nextImage');
  number = (number + 1) % 1000;
  Store.set('nextImage', number);
  let formattedNumber = ("00" + number).slice(-3);
  return IMAGE_PREFIX + formattedNumber;
}

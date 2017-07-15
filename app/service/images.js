import {remote} from 'electron';
const $ = window.require('nodobjc');
const fs = remote.require('fs');


import {IMAGE_MATCH} from '../constants'

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

export function getPasteFilesFromClipboard() {

  function fetch(t) {
    let dt = pb('dataForType', t);
    let str = $.NSString('alloc')('initWithData', dt, 'encoding', $.NSUTF8StringEncoding);
    return str('UTF8String');
  }

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
      // let string = path;
      let name = fetch($.NSPasteboardTypeString);
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

  files.forEach(function (file) {
    let string = $.NSString('stringWithUTF8String', file);
    array('addObject', $.NSURL('alloc')('initFileURLWithPath', string));
  });
  pasteboard('writeObjects', array);
}


export function pasteFile(source, target) {
  const error = 'File Already Existed'
  fs.existsSync(source);
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
}

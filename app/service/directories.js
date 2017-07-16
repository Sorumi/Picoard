import Store from '../utils/store';
import {remote} from 'electron';
import {arrayMove} from 'react-sortable-hoc';

import {IMAGE_MATCH} from '../constants';

const fs = remote.require('fs');

export function addDirectory(path) {
  const isDirectory = fs.lstatSync(path).isDirectory();
  if (!isDirectory) return false;

  const directory = {
    color: 1,
    name: path.replace(/^.*[\\\/]/, '').replace(/:/g, '/'),
    path,
  };

  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    const newDirectories = [
      ...directories.filter(
        (d) => d.path !== path)
      , directory
    ];
    Store.set('directories', newDirectories);
  } else {
    const newDirectories = [directory];
    Store.set('directories', newDirectories);
  }

  return true;
}


export function removeDirectory(index) {
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    let directories = Store.get('directories');
    directories.splice(index, 1);
    Store.set('directories', directories);
  }
}


export function loadDirectories() {
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    const newDirectories = directories.map((d) => {
      const isExist = fs.existsSync(d.path);
      return {
        ...d,
        exist: isExist,
        count: isExist ? fs.readdirSync(d.path)
          .filter(file =>
            file.toLowerCase().match(IMAGE_MATCH)
          ).length : null,
      }
    });
    return newDirectories;
  }
}

export function existDirectory(path) {
  return fs.existsSync(path);
}

export function isDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}
export function getDirectoryByIndex(index) {
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    if (directories.length > index) {
      return directories[index];
    }
  }
}

export function sortDirectories(oldIndex, newIndex) {
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    const newDirectories = arrayMove(directories, oldIndex, newIndex);
    Store.set('directories', newDirectories);
  }
}

export function saveDirectory(index, color, name) {
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    if (directories.length > index) {
      let directory = directories[index];
      directory.color = color;
      directory.name = name;
      directories[index] = directory;
      Store.set('directories', directories);
    }
  }
}

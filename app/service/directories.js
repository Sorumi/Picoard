import Store from '../utils/store';
import {remote} from 'electron';
import {arrayMove} from 'react-sortable-hoc';

export function addDirectory(path) {
  const directory = {
    color: 1,
    name: path.substr(path.lastIndexOf('/') + 1),
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
  // Store.clear();
  let hasDirectories = Store.has('directories');
  if (hasDirectories) {
    const directories = Store.get('directories');
    const fs = remote.require('fs');
    const newDirectories = directories.map((d) => {
      return {
        ...d,
        count: fs.readdirSync(d.path)
          .filter(file =>
            file.toLowerCase().match(/\.(jpe?g|png|gif)$/)
          ).length,
      }
    });
    return newDirectories;
  }
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

import Store from '../utils/store';
import {remote} from 'electron';


export function addDirectory(path) {
    const directory = {
        color: 0,
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

export function loadDirectories() {
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
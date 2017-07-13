
import Store from 'electron-store';
import {ipcMain} from 'electron';

const store = new Store();

module.exports.init = () => {
    ipcMain.on('store-set', (event, ...arg) => {
        store.set(...arg);
        event.returnValue = null;
    });

    ipcMain.on('store-get', (event, ...arg) => {
        event.returnValue = store.get(...arg);
    });

    ipcMain.on('store-has', (event, ...arg) => {
        event.returnValue = store.has(...arg);
    });

    ipcMain.on('store-delete', (event, ...arg) => {
        store.delete(...arg);
        event.returnValue = null;
    });

    ipcMain.on('store-clear', (event, ...arg) => {
        store.clear(...arg);
        event.returnValue = null;
    });

    ipcMain.on('store-size', (event) => {
        event.returnValue = store.size;
    });

    ipcMain.on('store', (event) => {
        event.returnValue = store.store;
    });
};



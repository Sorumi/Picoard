import {ipcRenderer} from 'electron';

let instance = null;

class Store {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.set = (...arg) => {
            return ipcRenderer.sendSync('store-set', ...arg);
        };

        this.get = (...arg) => {
            return ipcRenderer.sendSync('store-get', ...arg);
        };

        this.has = (...arg) => {
            return ipcRenderer.sendSync('store-has', ...arg);
        };

        this.delete = (...arg) => {
            return ipcRenderer.sendSync('store-delete', ...arg);
        };

        this.clear = (...arg) => {
            return ipcRenderer.sendSync('store-clear', ...arg);
        };

        this.size = ipcRenderer.sendSync('store-size');

        this.store = ipcRenderer.sendSync('store');

        return instance;
    }
}

export default new Store();
/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {app, BrowserWindow} from 'electron';
import MenuBuilder from './main/menu';
import StoreBuilder from './main/store';

let mainWindow = null;
let aboutWindow = null;
let menuBuilder = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


app.setName('Picoard');
app.commandLine.appendSwitch('touch-events', 'enabled');

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  menuBuilder = new MenuBuilder(loadMainWindow, loadAboutWindow);

  loadMainWindow();

  menuBuilder.buildMenu();

  StoreBuilder.init();

});


app.on('activate', () => {
  if (!mainWindow) {
    loadMainWindow();
  }
});


function loadMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Picoard",
    show: false,
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {webSecurity: false},
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  menuBuilder.setMainWindow(mainWindow);
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.webContents.send('main');
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    menuBuilder.setMainWindow(null);
  });

  mainWindow.on('resize', function (event) {
    event.sender.send('window-resize', mainWindow.getSize())
  });

  mainWindow.on('focus', function (event) {
    event.sender.send('window-focus')
  });

  // scroll event
  // mainWindow.on('scroll-touch-begin', function (event) {
  //   event.sender.send('scroll-begin');
  //   console.log('scroll-touch-begin', event)
  // });
  //
  // mainWindow.on('scroll-touch-end', function (event) {
  //   event.sender.send('scroll-end');
  //   console.log('scroll-touch-end', event)
  // });

}

function loadAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About Picoard",
    show: false,
    width: 360,
    height: 400,
    resizable: false,
    titleBarStyle: 'hiddenInset',
  });

  aboutWindow.loadURL(`file://${__dirname}/app.html`);
  menuBuilder.setAboutWindow(aboutWindow);

  aboutWindow.webContents.on('did-finish-load', () => {
    if (!aboutWindow) {
      throw new Error('"aboutWindow" is not defined');
    }
    aboutWindow.webContents.send('about');
    aboutWindow.show();
    aboutWindow.focus();
  });

  aboutWindow.on('closed', () => {
    aboutWindow = null;
    menuBuilder.setAboutWindow(null);
  });
}

// @flow
import {app, Menu, shell, BrowserWindow} from 'electron';


export default class MenuBuilder {

  loadMainWindow;
  loadAboutWindow;
  mainWindow: BrowserWindow;
  aboutWindow: BrowserWindow;

  constructor(loadMainWindow, loadAboutWindow) {
    this.loadMainWindow = loadMainWindow;
    this.loadAboutWindow = loadAboutWindow;
  }

  setMainWindow(mainWindow) {
    this.mainWindow = mainWindow;
  }

  setAboutWindow(aboutWindow) {
    this.aboutWindow = aboutWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }

    let template;

    if (process.platform === 'darwin') {
      template = this.buildDarwinTemplate();
    } else {
      template = this.buildDefaultTemplate();
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const {x, y} = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }])
        .popup(this.mainWindow);
    });
  }

  findMenuItem(key) {
    const menu = Menu.getApplicationMenu()
    if (!menu) return;

    let menuItem;
    menu.items.forEach(function (item) {
      if (item.submenu) {
        item.submenu.items.forEach((item) => {
          if (item.key === key) {
            menuItem = item
          }
        })
      }
    });
    return menuItem;
  }

  setMenuItemVisibleAndEnabled(key, {visible, enabled}) {
    let menuItem = this.findMenuItem(key);
    if (menuItem) {
      if (visible) menuItem.visible = visible;
      if (enabled) menuItem.enabled = enabled;
    }
  }

  buildDarwinTemplate() {
    const name = app.getName();
    const subMenuAbout = {
      label: name,
      submenu: [
        // {label: 'About Picoard', selector: 'orderFrontStandardAboutPanel:'},
        {
          label: `About ${name}`, click: () => {
          if (this.aboutWindow) {
            this.aboutWindow.focus();
          } else {
            this.loadAboutWindow();
          }
        }
        },
        {type: 'separator'},
        // { label: 'Services', submenu: [] },
        // { type: 'separator' },
        {label: `Hide ${name}`, accelerator: 'Command+H', selector: 'hide:'},
        {label: 'Hide Others', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:'},
        {label: 'Show All', selector: 'unhideAllApplications:'},
        {type: 'separator'},
        {
          label: 'Quit', accelerator: 'Command+Q', click: () => {
          app.quit();
        }
        }
      ]
    };
    const subMenuFile = {
      label: 'File',
      submenu: [
        {
          label: 'New Directory', accelerator: 'Command+N', click: () => {
          if (this.mainWindow) {
            this.mainWindow.webContents.send('new-directory');
          }
        }
        },
      ]
    };
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        // {label: 'Undo', accelerator: 'Command+Z', selector: 'undo:'},
        // {label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:'},
        // {type: 'separator'},
        // {label: 'Cut', accelerator: 'Command+X', selector: 'cut:'},
        {label: 'Copy', key: 'copy', accelerator: 'Command+C', selector: 'copy:'},
        {label: 'Paste', key: 'paste', accelerator: 'Command+V', selector: 'paste:'},
        {
          label: 'Delete', key: 'delete', accelerator: 'Command+Delete', selector: 'de;ete:', click: () => {
          if (this.mainWindow) {
            this.mainWindow.webContents.send('delete');
          }
        }
        },

        {
          label: 'Select All', key: 'selectAll', accelerator: 'Command+A', selector: 'selectAll:', click: () => {
          if (this.mainWindow) {
            this.mainWindow.webContents.send('selectAll');
          }
        }
        },
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload', accelerator: 'Command+R', click: () => {
          // console.log(this.mainWindow);
          if (this.mainWindow) {
            this.mainWindow.webContents.reload();
          } else {
            this.loadMainWindow();
          }
        }
        },
        {
          label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => {
          if (this.mainWindow) {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
        },
        {
          label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click: () => {
          if (this.mainWindow) {
            this.mainWindow.toggleDevTools();
          }
        }
        }
      ]
    };
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => {
          if (this.mainWindow) {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
        }
      ]
    };
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:'},
        {label: 'Close', accelerator: 'Command+W', selector: 'performClose:'},
        {type: 'separator'},
        {label: 'Bring All to Front', selector: 'arrangeInFront:'}
      ]
    };
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More', click() {
          shell.openExternal('http://electron.atom.io');
        }
        },
        {
          label: 'Documentation', click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
        },
        {
          label: 'Community Discussions', click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
        },
        {
          label: 'Search Issues', click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
        }
      ]
    };

    const subMenuView = process.env.NODE_ENV === 'development'
      ? subMenuViewDev
      : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuFile,
      subMenuEdit,
      subMenuView,
      subMenuWindow,
      // subMenuHelp
    ];
  }

  buildDefaultTemplate() {
    const templateDefault = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: () => {
          if (this.mainWindow) {
            this.mainWindow.close();
          }
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: () => {
          if (this.mainWindow) {
            this.mainWindow.webContents.reload();
          } else {
            this.loadMainWindow();
          }
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: () => {
          if (this.mainWindow) {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }

        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: () => {
          if (this.mainWindow) {
            this.mainWindow.toggleDevTools();
          }
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: () => {
          if (this.mainWindow) {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    return templateDefault;
  }
}

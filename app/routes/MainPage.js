import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import * as directoriesService from '../service/directories';
import * as imagesService from '../service/images';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
import Sidebar from '../components/Sidebar/Sidebar';
import HintModal from '../components/Hint/HintModal';
import ModalContent from '../components/Hint/ModalContent';

class MainPage extends Component {

  componentWillMount() {
    // Resize
    ipcRenderer.on('window-resize', (evt, data) => {
      const size = {
        // width: data[0],
        // height: data[1],
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.props.handleChangeWindowSize(size);
    });

    // Focus
    ipcRenderer.on('window-focus', (evt) => {
      this.props.handleFocusWindow();
    });

    const {location, handleSelectAllImages, handleCopyImages, handlePasteImages, handleConfirmDeleteImages} = this.props;

    // Clipboard
    document.addEventListener("cut", (event) => {
      // console.log('cut');

    }, false);

    document.addEventListener("copy", (event) => {
      // console.log('copy');
      handleCopyImages();
    }, false);

    document.addEventListener("paste", (event) => {
      // console.log('paste');
      handlePasteImages();
    }, false);

    ipcRenderer.on('delete', () => {
      handleConfirmDeleteImages();
    });

    ipcRenderer.on('selectAll', () => {
      if (location.pathname === '/main/images') {
        handleSelectAllImages();
      }
    });

    // Keydown
    const {handlePressKey} = this.props;
    document.addEventListener("keydown", function (e) {
      if (e.metaKey) {
        // Select All
        if (e.keyCode === 65 || e.keyCode === 97) { // 'A' or 'a'
          e.preventDefault();
          if (location.pathname === '/main/images') {
            handleSelectAllImages();
          }
          // Delete
        } else if (e.keyCode === 8) {
          e.preventDefault();
          handleConfirmDeleteImages();
        }
      } else {
        handlePressKey(e.key);
      }

    });
  }

  componentDidMount() {
    this.props.handleChangeWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }


  handleDropDirectories = (files) => {
    for (let i = 0; i < files.length; ++i) {
      const isDirectory = directoriesService.isDirectory(files[i].path);
      if (isDirectory) {
        this.props.handleAddDirectory(files[i].path);
      }
    }
  };

  handleDropImages = (files) => {
    this.props.handlePasteImagesFromDrop(files);
  };

  render() {
    const {children, directories, existWarning, deleteConfirm, handleDeleteImages, handleCloseWarning, handleCloseConfirm} = this.props;

    return (
      <div>
        <MainLayout>
          <SideLayout
            sidebar={<Sidebar/>}
            handleDropDirectories={this.handleDropDirectories}
            handleDropImages={this.handleDropImages}
            empty={!directories || directories.length === 0}
          >
            {children}
          </SideLayout>
        </MainLayout>
        <HintModal
          visible={existWarning.show}
          type="warning"
          title="Failed to Copy"
          content={
            <ModalContent
              files={existWarning.files}
              text={existWarning.files.length > 1 ? 'Images Already Existed' : 'Image Already Existed'}
            />}
          onOk={handleCloseWarning}
          onCancel={handleCloseWarning}
        />
        <HintModal
          visible={deleteConfirm.show}
          type="confirm"
          title="Do you Want to delete"
          content={
            <ModalContent
              files={deleteConfirm.files}
              text={deleteConfirm.files.length > 1 ? 'These Images ?' : 'This Image ?'}
            />}
          onOk={handleDeleteImages}
          onCancel={handleCloseConfirm}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {location} = state.router;
  const {existWarning, deleteConfirm} = state.hint;
  const {directories} = state.directories;
  return {
    location,
    existWarning,
    deleteConfirm,
    directories
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChangeWindowSize: (size) => {
      dispatch({
        type: 'window/changeWindow',
        payload: size,
      })
    },
    handleFocusWindow: () => {
      dispatch({
        type: 'window/focusWindow',
        payload: {},
      })
    },
    handlePressKey: (key) => {
      dispatch({
        type: 'window/pressKey',
        payload: key,
      })
    },
    handleAddDirectory: (file) => {
      dispatch({
        type: 'directories/addDirectory',
        payload: file
      });
    },
    handleSelectAllImages: () => {
      dispatch({
        type: 'images/selectAllImages',
        payload: {}
      });
    },
    handleCopyImages: () => {
      dispatch({
        type: 'images/copyImages',
        payload: {}
      });
    },
    handlePasteImages: () => {
      dispatch({
        type: 'images/pasteImages',
        payload: {}
      });
    },
    handlePasteImagesFromDrop: (files) => {
      dispatch({
        type: 'images/pasteImageFiles',
        payload: files
      });
    },
    handleConfirmDeleteImages: () => {
      dispatch({
        type: 'images/confirmDeleteImages',
        payload: {},
      });
    },
    handleDeleteImages: () => {
      dispatch({
        type: 'images/deleteImages',
        payload: {}
      });
    },
    handleCloseWarning: () => {
      dispatch({
        type: 'hint/saveExistWarning',
        payload: {
          show: false,
          files: [],
        },
      });
    },
    handleCloseConfirm: () => {
      dispatch({
        type: 'hint/saveDeleteConfirm',
        payload: {
          show: false,
          files: [],
        },
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


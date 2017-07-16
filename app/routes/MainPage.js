import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import * as directoriesService from '../service/directories';
import * as imagesService from '../service/images';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
import Sidebar from '../components/Sidebar/Sidebar';
import HintModal from '../components/Hint/HintModal';
import ExistWarningModalContent from '../components/Hint/ExistWarningModalContent';

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


    // let paths = ['/Users/Sorumi/Desktop/11\:111/Sea1.jpg', '/Users/Sorumi/Developer/Picoard/resources/icon.png'];
    // imagesService.setCopyFilesToClipboard(paths);

    const {handleCopyImages, handlePasteImages} = this.props;

    // Document
    document.addEventListener("cut", (event) => {
      console.log('cut');

    }, false);

    document.addEventListener("copy", (event) => {
      console.log('copy');
      handleCopyImages();
    }, false);

    document.addEventListener("paste", (event) => {
      console.log('paste');
      handlePasteImages();
    }, false);

    // Zoom
    let deltaX = 0, deltaY = 0;
    const {handlePinch, handlePressKey} = this.props;

    document.addEventListener('mousewheel', function (e) {
      if (e.ctrlKey) {
        deltaY += e.deltaY;
        handlePinch(e.deltaY, deltaY);
      } else {
        deltaX += e.deltaX;
        deltaY += e.deltaY;
      }
    });

    // Keydown
    document.addEventListener("keydown", function (e) {
      if (e.metaKey) {
        if (e.keyCode === 65 || e.keyCode === 97) { // 'A' or 'a'
          e.preventDefault();
          console.log('selectAll');
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

  render() {
    const {children, existWarning, handleCloseWarning} = this.props;
    return (
      <div>
        <MainLayout>
          <SideLayout
            sidebar={<Sidebar/>}
            handleDropDirectories={this.handleDropDirectories}
          >
            {children}
          </SideLayout>
        </MainLayout>

        <HintModal
          visible={existWarning.show}
          type="warning"
          title="Failed to Copy"
          content={<ExistWarningModalContent files={existWarning.files}/>}
          onOk={handleCloseWarning}
          onCancel={handleCloseWarning}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {existWarning} = state.hint;
  return {
    existWarning,
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
    handlePinch: (factor, total) => {
      dispatch({
        type: 'window/pinchWindow',
        payload: {
          factor,
          total
        }
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
    handleCloseWarning: () => {
      dispatch({
        type: 'hint/saveExistWarning',
        payload: {
          show: false,
          files: [],
        },
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


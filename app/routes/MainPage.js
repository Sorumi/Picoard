import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import * as directoriesService from '../service/directories';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
import Sidebar from '../components/Sidebar/Sidebar';

class MainPage extends Component {

  componentWillMount() {
    ipcRenderer.on('window-resize', (evt, data) => {
      const size = {
        // width: data[0],
        // height: data[1],
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.props.handleChangeWindowSize(size);
    });

    ipcRenderer.on('window-focus', (evt) => {
      this.props.handleFocusWindow();
    });


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

    document.addEventListener("keydown", function (e) {
      handlePressKey(e.key);
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
    const {children} = this.props;
    return (
      <div tabIndex="0"
        // onKeyDown={this.handleKeyPress}
        // onDrop={this.handleDrop}
      >
        <MainLayout>
          <SideLayout
            sidebar={<Sidebar/>}
            handleDropDirectories={this.handleDropDirectories}
          >
            {children}
          </SideLayout>
        </MainLayout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


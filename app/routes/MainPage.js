import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

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

    const handlePinch =  this.props.handlePinch;

    document.addEventListener('mousewheel', function(e) {
      if (e.ctrlKey) {
        deltaY += e.deltaY;
        handlePinch(e.deltaY, deltaY);
      } else {
        deltaX += e.deltaX;
        deltaY += e.deltaY;
      }
    });
  }

  componentDidMount() {
    this.props.handleChangeWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }


  render() {
    const {children} = this.props;
    return (
      <div>
        <MainLayout>
          <SideLayout
            sidebar={<Sidebar/>}
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
        type:'window/pinchWindow',
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


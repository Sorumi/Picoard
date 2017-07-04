import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
// import ContentLayout from '../components/MainLayout/ContentLayout';
import Sidebar from '../components/Sidebar/Sidebar';
// import ImagesTop from '../components/Images/ImagesTop';
// import ImageList from '../components/Images/ImageList';

class MainPage extends Component {

  componentWillMount() {
    ipcRenderer.on('window-resize', (evt, data) => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.props.handleChangeWindowSize(size)
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


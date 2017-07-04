import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
import ContentLayout from '../components/MainLayout/ContentLayout';
import Sidebar from '../components/Sidebar/Sidebar';
import ImagesTop from '../components/Images/ImagesTop';
import ImageList from '../components/Images/ImageList';

class App extends Component {

  componentWillMount() {
    ipcRenderer.on('window-resize', (evt, data) => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      // console.log(size);
      this.props.handleChangeWindowSize(size)
    });
  }

  componentDidMount() {
    this.props.handleChangeWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  handleListScroll = (height) => {
    // console.log(height);
    if (height.scrollTop + height.offsetHeight === height.scrollHeight) {
      this.props.handleLoadMoreImage();
    }
  };

  render() {
    const {path, imageWidth, imageMargin, showImages, size, sidebarWidth, offsetX, directories, currentDirIndex} = this.props;
    return (
      <div>
        <MainLayout>
          <SideLayout
            sidebar={<Sidebar/>}
          >
            <ContentLayout
              top={<ImagesTop
                directory={directories[currentDirIndex]}
              />}
              onContentScroll={this.handleListScroll}
            >
              {showImages.columnImages ?
                <ImageList
                  width={size.width - sidebarWidth - offsetX}
                  height={size.height - 120}
                  imageWidth={imageWidth}
                  imageMargin={imageMargin}
                  path={path}
                  columnImages={showImages.columnImages}
                /> : null }
            </ContentLayout>
          </SideLayout>
        </MainLayout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {path, images, column, imageWidth, imageMargin, showImages} = state.images;
  const {size, sidebarWidth, offsetX} = state.window;
  const {directories, currentDirIndex} = state.directories;
  return {
    path,
    size,
    sidebarWidth,
    offsetX,
    images,
    column,
    imageWidth,
    imageMargin,
    showImages,
    directories,
    currentDirIndex
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
    handleLoadMoreImage: () => {
      dispatch({
        type: 'images/loadMoreShowImages',
        payload: {},
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


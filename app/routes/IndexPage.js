import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import ContentLayout from '../components/MainLayout/ContentLayout';
import ImagesTop from '../components/Images/ImagesTop';
import ImageList from '../components/Images/ImageList';

class IndexPage extends Component {

  handleListScroll = (height) => {
    if (height.scrollTop + height.offsetHeight === height.scrollHeight) {
      this.props.handleLoadMoreImage();
    }
  };

  render() {
    const {path, imageWidth, isScroll, showImages, size, sidebarWidth, offsetX, directories, currentDirIndex, handleClickImage} = this.props;
    return (
      <ContentLayout
        top={<ImagesTop
          directory={directories[currentDirIndex]}
        />}
        onContentScroll={this.handleListScroll}
        hideX={true}
        isScroll={isScroll}
      >
        {showImages.columnImages ?
          <ImageList
            path={path}
            columnImages={showImages.columnImages}
            width={size.width - sidebarWidth - offsetX}
            height={size.height - 120}
            imageWidth={imageWidth}
            onClickImage={handleClickImage}
          /> : null
        }
      </ContentLayout>
    );
  }
}

function mapStateToProps(state) {
  const {path, images, column, imageWidth, isScroll, showImages} = state.images;
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
    isScroll,
    showImages,
    directories,
    currentDirIndex
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClickImage: (path, name) => {
      dispatch({
        type: 'image/fetchImage',
        payload: {
          path,
          name
        }
      });
      dispatch(push('/image'));
    },
    handleLoadMoreImage: () => {
      dispatch({
        type: 'images/loadMoreShowImages',
        payload: {},
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)


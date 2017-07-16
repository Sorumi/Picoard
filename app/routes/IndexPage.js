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
    const {path, imageWidth, isScroll, selectImages, showImages, size, sidebarWidth, offsetX, directories, currentDirIndex,
      handlePinchContent, handleClickContent, handleClickImage, handleDoubleClickImage} = this.props;
    return (
      <ContentLayout
        top={<ImagesTop
          directory={directories[currentDirIndex]}
        />}
        onContentClick={handleClickContent}
        onContentScroll={this.handleListScroll}
        onContentPinch={handlePinchContent}
        hideX={true}
        isScroll={isScroll}
        bothScroll={false}
      >
        {showImages.columnImages ?
          <ImageList
            selectImages={selectImages}
            path={path}
            columnImages={showImages.columnImages}
            width={size.width - sidebarWidth - offsetX}
            height={size.height - 120}
            imageWidth={imageWidth}
            onClickImage={handleClickImage}
            onDoubleClickImage={handleDoubleClickImage}
          /> : null
        }
      </ContentLayout>
    );
  }
}

function mapStateToProps(state) {
  const {path, images, selectImages, column, imageWidth, isScroll, showImages} = state.images;
  const {size, sidebarWidth, offsetX} = state.window;
  const {directories, currentDirIndex} = state.directories;
  return {
    path,
    size,
    sidebarWidth,
    offsetX,
    images,
    selectImages,
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
    handleClickContent: () => {
      dispatch({
        type: 'images/deselectAllImages',
        payload: {}
      });
    },
    handlePinchContent: (factor) => {
      dispatch({
        type: 'images/pinchWindow',
        payload: factor

      })
    },
    handleClickImage: (metaKey, name) => {
      if (metaKey) {
        dispatch({
          type: 'images/addSelectImage',
          payload: name
        });
      } else {
        dispatch({
          type: 'images/selectImage',
          payload: name
        });
      }
    },
    handleDoubleClickImage: (path, name) => {
      dispatch({
        type: 'image/fetchImage',
        payload: {
          path,
          name
        }
      });
      dispatch(push('/main/image'));
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


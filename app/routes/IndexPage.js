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
    const {path, imageWidth, isScroll, activeImages, showImages, size, sidebarWidth, offsetX, directories, currentDirIndex, handleClickImage, handleDoubleClickImage} = this.props;
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
            activeImages={activeImages}
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
  const {path, images, activeImages, column, imageWidth, isScroll, showImages} = state.images;
  const {size, sidebarWidth, offsetX} = state.window;
  const {directories, currentDirIndex} = state.directories;
  return {
    path,
    size,
    sidebarWidth,
    offsetX,
    images,
    activeImages,
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
    handleClickImage: (metaKey, name) => {

      if (metaKey) {
        dispatch({
          type: 'images/addActiveImage',
          payload: name

        });
      } else {
        dispatch({
          type: 'images/activeImage',
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


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
    const {path, imageWidth, imageMargin, showImages, size, sidebarWidth, offsetX, directories, currentDirIndex, handleClickImage} = this.props;
    return (
      <ContentLayout
        top={<ImagesTop
          directory={directories[currentDirIndex]}
        />}
        onContentScroll={this.handleListScroll}
      >
        {showImages.columnImages ?
          <ImageList
            path={path}
            columnImages={showImages.columnImages}
            width={size.width - sidebarWidth - offsetX}
            height={size.height - 120}
            imageWidth={imageWidth}
            imageMargin={imageMargin}
            onClickImage={handleClickImage}
          /> : null
        }
      </ContentLayout>
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
    handleClickImage: (path) => {
      dispatch({
        type: 'image/fetchImage',
        payload: path,
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


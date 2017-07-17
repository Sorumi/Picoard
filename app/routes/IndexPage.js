import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

import ContentLayout from '../components/MainLayout/ContentLayout';
import ImagesTop from '../components/Images/ImagesTop';
import ImageList from '../components/Images/ImageList';

class IndexPage extends Component {

  handleListScroll = (data) => {
    if (data.scrollTop + data.offsetHeight === data.scrollHeight) {
      this.props.handleLoadMoreImage();
    }
    this.props.handleContentScroll(data);
  };

  render() {
    const {
      path, imageWidth, isScroll, selectImages, showImages, menu, size, sidebarWidth, offsetX, scroll, directories, currentDirIndex,
      handlePinchContent, handleOpenMenu, handleClickBlank, handleClickImage, handleDoubleClickImage, handleRightClickImage,
      handleCopyImages, handlePasteImages, handleConfirmDeleteImages, handleSelectAllImages
    } = this.props;
    return (
      <ContentLayout
        top={ directories && directories.length > 0 ?
          <ImagesTop directory={directories[currentDirIndex]}/> : null
        }
        onContentScroll={this.handleListScroll}
        onContentPinch={handlePinchContent}
        hideX={true}
        isScroll={isScroll}
        bothScroll={false}
      >
        {showImages.columnImages ?
          <ImageList
            sidebarWidth={sidebarWidth + offsetX}
            scroll={scroll}
            selectImages={selectImages}
            path={path}
            columnImages={showImages.columnImages}
            menu={menu}
            width={size.width - sidebarWidth - offsetX}
            height={size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT}
            imageWidth={imageWidth}
            onOpenMenu={handleOpenMenu}
            onClickImage={handleClickImage}
            onDoubleClickImage={handleDoubleClickImage}
            onRightClickImage={handleRightClickImage}
            onBlankClick={handleClickBlank}
            onClickImagesCopy={handleCopyImages}
            onClickImagesPaste={handlePasteImages}
            onClickImagesDelete={handleConfirmDeleteImages}
            onClickImagesSelectAll={handleSelectAllImages}
          /> : null
        }
      </ContentLayout>
    );
  }
}

function mapStateToProps(state) {
  const {path, images, selectImages, column, imageWidth, isScroll, showImages, menu} = state.images;
  const {size, sidebarWidth, offsetX, scroll} = state.window;
  const {directories, currentDirIndex} = state.directories;
  return {
    path,
    size,
    sidebarWidth,
    offsetX,
    scroll,
    images,
    selectImages,
    column,
    imageWidth,
    isScroll,
    showImages,
    menu,
    directories,
    currentDirIndex
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClickBlank: () => {
      dispatch({
        type: 'images/deselectAllImages',
        payload: {}
      });
    },
    handleContentScroll: (data) => {
      dispatch({
        type: 'window/saveScroll',
        payload: {
          top: data.scrollTop,
          left: data.scrollLeft,
        }

      })
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
          type: 'images/toggleSelectImage',
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
    handleOpenMenu: () => {
      dispatch({
        type: 'images/canAll',
        payload: {}
      });
    },
    handleRightClickImage: (name) => {

      dispatch({
        type: 'images/addSelectImage',
        payload: name
      });
    },
    handleLoadMoreImage: () => {
      dispatch({
        type: 'images/loadMoreShowImages',
        payload: {},
      })
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
    handleConfirmDeleteImages: () => {
      dispatch({
        type: 'images/confirmDeleteImages',
        payload: {},
      });
    },
    handleSelectAllImages: () => {
      dispatch({
        type: 'images/selectAllImages',
        payload: {}
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)


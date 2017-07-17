/**
 * Created by Sorumi on 17/7/4.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import ContentLayout from '../components/MainLayout/ContentLayout';

import ImageTop from '../components/Image/ImageTop';
import ImageWrapper from '../components/Image/ImageWrapper';

import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT} from '../constants'

class ImagePage extends Component {

  render() {
    const {
      path, name, imageWidth, imageHeight, marginTop,
      size, sidebarWidth, offsetX, scroll, menu,
      handleContentScroll, handlePinchContent,
      handleOpenMenu, handleCopyImages, handleConfirmDeleteImages
    } = this.props;
    return (

      <ContentLayout
        top={<ImageTop/>}
        hideX={false}
        bothScroll={true}
        onContentPinch={handlePinchContent}
        onContentScroll={handleContentScroll}
      >
        {path && name ?
          <ImageWrapper
            menu={menu}
            path={`${path}/${name}`}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            marginTop={marginTop}
            width={size.width - sidebarWidth - offsetX}
            height={size.height - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT}
            sidebarWidth={sidebarWidth + offsetX}
            scroll={scroll}
            onOpenMenu={handleOpenMenu}
            onClickImagesCopy={handleCopyImages}
            onClickImagesDelete={handleConfirmDeleteImages}
          /> : null
        }
      </ContentLayout>

    );
  }
}

function mapStateToProps(state) {
  const {path, name, imageWidth, imageHeight, marginTop} = state.image;
  const {size, sidebarWidth, offsetX, scroll} = state.window;
  const {menu} = state.images;
  return {
    path,
    name,
    imageWidth,
    imageHeight,
    marginTop,
    size,
    sidebarWidth,
    offsetX,
    scroll,
    menu
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handlePinchContent: (factor) => {
      dispatch({
        type: 'image/pinchWindow',
        payload: factor

      })
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
    handleOpenMenu: () => {
      dispatch({
        type: 'images/canAll',
        payload: {}
      });
    },
    handleCopyImages: () => {
      dispatch({
        type: 'images/copyImages',
        payload: {}
      });
    },
    handleConfirmDeleteImages: () => {
      dispatch({
        type: 'images/confirmDeleteImages',
        payload: {},
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)


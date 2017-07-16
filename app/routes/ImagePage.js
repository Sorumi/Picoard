/**
 * Created by Sorumi on 17/7/4.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import ContentLayout from '../components/MainLayout/ContentLayout';

import ImageTop from '../components/Image/ImageTop';
import ImageWrapper from '../components/Image/ImageWrapper';

class ImagePage extends Component {

  render() {
    const {path, name, imageWidth, imageHeight, marginTop, handlePinchContent} = this.props;
    return (

      <ContentLayout
        top={<ImageTop/>}
        hideX={false}
        bothScroll={true}
        onContentPinch={handlePinchContent}
      >
        {path && name ?
          <ImageWrapper
            path={`${path}/${name}`}
            width={imageWidth}
            height={imageHeight}
            marginTop={marginTop}
          /> : null
        }
      </ContentLayout>

    );
  }
}

function mapStateToProps(state) {
  const {path, name, imageWidth, imageHeight, marginTop} = state.image;
  return {
    path,
    name,
    imageWidth,
    imageHeight,
    marginTop
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)


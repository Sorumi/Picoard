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
    const {path, imageWidth, imageHeight, marginTop} = this.props;
    return (

      <ContentLayout
        top={<ImageTop/>}
        hideX={false}
      >
        {path ?
          <ImageWrapper
            path={path}
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
  const {path, imageWidth, imageHeight, marginTop} = state.image;
  return {
    path,
    imageWidth,
    imageHeight,
    marginTop
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)


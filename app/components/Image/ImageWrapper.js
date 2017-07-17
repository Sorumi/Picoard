import React, {Component} from 'react';
import ClickOutside from 'react-click-outside';

import ImageItem from '../Images/ImageItem';
import ImageMenu from '../Images/ImageMenu';

import styles from './ImageWrapper.css';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT, IMAGE_MENU_WIDTH, IMAGE_MENU_SMALL_HEIGHT} from '../../constants'

// function ImageWrapper({path, width, height, marginTop}) {
class ImageWrapper extends Component {

  constructor() {
    super();
    this.state = {
      menuVisible: false,
      menuX: 0,
      menuY: 0,
    };
  }

  handleCloseMenu = (event) => {
    if (this.state.menuVisible && event) {
      event.stopPropagation();
    }
    this.setState({menuVisible: false});
  };

  handleImageMenu = (event, image) => {
    // this.props.onRightClickImage(image);
    this.props.onOpenMenu();
    this.calculateMenuPosition(event);
  };


  calculateMenuPosition(event) {
    const {sidebarWidth, width, height, scroll} = this.props;

    let x = event.clientX - sidebarWidth + scroll.left;
    let y = event.clientY - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT + scroll.top;

    if ((x + IMAGE_MENU_WIDTH) > (width + scroll.left)) {
      x = width - IMAGE_MENU_WIDTH + scroll.left - 20;
    }
    if ((y + IMAGE_MENU_SMALL_HEIGHT) > (height + scroll.top)) {
      y = height - IMAGE_MENU_SMALL_HEIGHT + scroll.top - 20;
    }

    this.setState({
      menuVisible: true,
      menuX: x,
      menuY: y,
    });
  }

  render() {
    const {
      path, imageWidth, imageHeight, marginTop, menu,
      onClickImagesCopy, onClickImagesDelete
    } = this.props;
    const {menuVisible, menuX, menuY} = this.state;

    return (
      <div className={styles.wrapper}
           style={{paddingTop: marginTop}}>
        <ImageItem
          path={`${path}`}
          width={imageWidth}
          height={imageHeight}
          update={true}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            this.handleImageMenu(event)
          }}
        />

        <ClickOutside
          className={styles.menu}
          style={{top: menuY + 'px', left: menuX + 'px'}}
          onClickOutside={this.handleCloseMenu}>
          <ImageMenu
            enabled={menu}
            type="small"
            width={IMAGE_MENU_WIDTH}
            visible={menuVisible}
            onClick={this.handleCloseMenu}
            onClickCopy={onClickImagesCopy}
            onClickDelete={onClickImagesDelete}
          />
        </ClickOutside>

      </div>
    )
  }
}

export default ImageWrapper;

import React, {Component} from 'react';
import ClickOutside from 'react-click-outside';

import ImageItem from './ImageItem';
import ImageMenu from './ImageMenu';

import styles from './ImageList.css';
import {TITLE_BAR_HEIGHT, CONTENT_TOP_HEIGHT, IMAGE_MENU_WIDTH, IMAGE_MENU_HEIGHT} from '../../constants'

class ImageList extends Component {
// function ImageList({path, columnImages, selectImages, imageWidth, onClickImage, onDoubleClickImage, onImageMenu}) {
  timeoutID = null;

  constructor() {
    super();
    this.state = {
      menuVisible: false,
      menuX: 0,
      menuY: 0,
    };
  }

  handleClickImage = (onClick, onDoubleClick, delay) => {
    delay = delay || 250;
    let self = this;
    return function (event) {
      event.stopPropagation();
      const metaKey = event.metaKey;
      if (!self.timeoutID) {
        self.timeoutID = setTimeout(() => {
          onClick(metaKey);
          self.timeoutID = null
        }, delay);
        // console.log(timeoutID)
      } else {
        self.timeoutID = clearTimeout(self.timeoutID);
        console.log('d');
        onDoubleClick();
      }
    };
  };

  handleCloseMenu = () => {
    this.setState({menuVisible: false});
  };

  handleImageMenu = (event, image) => {
    this.props.onRightClickImage(image);
    this.calculateMenuPosition(event);
  };

  handleBlankMenu = (event) => {
    this.calculateMenuPosition(event);
  };

  calculateMenuPosition(event) {
    const {sidebarWidth, width, height, scroll} = this.props;

    let x = event.clientX - sidebarWidth + scroll.left;
    let y = event.clientY - TITLE_BAR_HEIGHT - CONTENT_TOP_HEIGHT + scroll.top;

    if ((x + IMAGE_MENU_WIDTH) > (width + scroll.left)) {
      x = width - IMAGE_MENU_WIDTH + scroll.left - 10;
    }
    if ((y + IMAGE_MENU_HEIGHT) > (height + scroll.top)) {
      y = height - IMAGE_MENU_HEIGHT + scroll.top - 10;
    }

    this.setState({
      menuVisible: true,
      menuX: x,
      menuY: y,
    });
  }

  render() {
    const {
      path, columnImages, selectImages, imageWidth,
      onClickImage, onDoubleClickImage, onBlankClick,
      onClickImagesCopy, onClickImagesPaste, onClickImagesDelete, onClickImagesSelectAll
    } = this.props;
    const {menuVisible, menuX, menuY} = this.state;
    const column = columnImages.length;

    return (
      <div className={styles.list}
           onClick={onBlankClick}
           onContextMenu={(event) => {
             event.preventDefault();
             event.stopPropagation();
             this.handleBlankMenu(event)
           }}
      >
        {path && columnImages.map((images, index) =>
          <div
            key={index}
            className={styles.column + ' col_' + column}
          >
            {images.map(image =>

              <div
                key={image}
                className={styles.item}
              >
                <ImageItem
                  active={selectImages.indexOf(image) !== -1}
                  path={`${path}/${image}`}
                  width={imageWidth}
                  onClick={this.handleClickImage(
                    (metaKey) => onClickImage(metaKey, image),
                    () => onDoubleClickImage(path, image)
                  )}
                  onContextMenu={(event) => this.handleImageMenu(event, image)}
                />

              </div>
            )}
          </div>
        )}
        <ClickOutside
          className={styles.menu}
          style={{top: menuY + 'px', left: menuX + 'px'}}
          onClickOutside={this.handleCloseMenu}>
          <ImageMenu
            width={100}
            visible={menuVisible}
            onClick={this.handleCloseMenu}
            onClickCopy={onClickImagesCopy}
            onClickPaste={onClickImagesPaste}
            onClickDelete={onClickImagesDelete}
            onClickSelectAll={onClickImagesSelectAll}
          />
        </ClickOutside>

      </div>
    )
  }
}

export default ImageList;

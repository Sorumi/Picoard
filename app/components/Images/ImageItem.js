import React, {Component} from 'react';
import styles from './ImageItem.css';


class ImageItem extends Component {

// function ImageItem() {

  componentDidMount() {

    const {path} = this.props;

    let img = new Image();
    const element = this.refs.img;

    img.onload = function () {
      element.src = img.src;
    };

    img.src = `file://${path}`;
  }

  render() {
    const {path, width, height, onClick} = this.props;
    return (
      <img
        className={styles.img}
        ref="img"
        draggable={false}
        width={width}
        height={height}
        onClick={onClick ? () => onClick(`${path}`) : null}
      />

    )
  }
}

export default ImageItem;

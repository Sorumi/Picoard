import React, {Component} from 'react';
import styles from './ImageItem.css';


class ImageItem extends Component {

// function ImageItem() {
  img;
  element;


  componentDidMount() {
    // const {path} = this.props;

    this.img = new Image();
    this.element = this.refs.img;


    let {img, element} = this;


    this.img.onload = function () {
      element.src = img.src;
    };

    const {path} = this.props;

    this.img.src = `file://${path}`;
  }

  shouldComponentUpdate(props) {
    this.element.src = '';
    const {path} = props;
    this.img.src = `file://${path}`;
    return true;
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
        onClick={onClick ? () => onClick(path) : null}
      />

    )
  }
}

export default ImageItem;

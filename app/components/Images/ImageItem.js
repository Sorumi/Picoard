import React, {Component} from 'react';
import styles from './ImageItem.css';


class ImageItem extends Component {

  img;
  element;

  componentDidMount() {

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
    const {path: oldPath} = this.props;
    const {path: newPath} = props;
    // console.log(oldPath, newPath)
    if (newPath !== oldPath) {
      this.element.src = '';

      this.img.src = `file://${newPath}`;
    }
    return true;
  }

  render() {
    const {active, width, height, onClick} = this.props;
    let className = styles.img;
    className = active ? className + ' ' + styles.active : className;
    return (

        <img
          className={className}
          ref="img"
          draggable={false}
          width={width}
          height={height}
          onClick={onClick ? onClick : null}
        />
      // </div>
    )
  }
}

export default ImageItem;

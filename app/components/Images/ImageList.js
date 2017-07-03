import React, {Component} from 'react';
import sizeOf from 'image-size';
import styles from './ImageList.css';

class ImageList extends Component {

  constructor() {
    super();
    this.state = {
      lastIndex: 0,
    }
  }

  componentWillMount() {

  }

  render() {

    const {path, names, width, height, column, imageWidth} = this.props;
    const {lastIndex} = this.state;

    let columnHeight = [];
    let columnImage = [];
    for (let i = 0; i < column; i++) {
      columnHeight.push(0);
      columnImage.push([]);
    }
    let currentIndex = lastIndex;

    for (let i = lastIndex; i < names.length; i++) {
      const name = names[i];
      let file = `${path}/${name}`;
      let dimensions = sizeOf(file);
      let imageHeight = imageWidth / dimensions.width * dimensions.height;
      let index = columnHeight.indexOf(Math.min.apply(Math, columnHeight));
      columnHeight[index] += imageHeight;
      columnImage[index].push(name);
      currentIndex++;
      if (columnHeight.filter(h => h < (window.pageYOffset + height)).length === 0) {
        break;
      }

      // this.setState({
      //   lastIndex: currentIndex
      // })
    }

    return (
      <div className={styles.list}
           ref="list"
      >

        {columnImage.map((images, index) =>
          <div
            key={index}
            className={styles.column + ' col_' + column}>
            {images.map(image =>
              <div
                key={image}
                className={styles.item}>
                <img
                  src={`file://${path}/${image}`}
                  draggable={false}
                  width={imageWidth}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ImageList;

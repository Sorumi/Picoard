import React, {Component} from 'react';
import sizeOf from 'image-size';
import styles from './ImageList.css';

class ImageList extends Component {

  constructor() {
    super();
    this.state = {
      column: 3,
    }
  }
  componentWillMount() {

  }

  render() {

    const {path, names, width, column, imageWidth} = this.props;

    let columnHeight = [];
    let columnImage = [];
    for (let i = 0; i < column; i++) {
      columnHeight.push(0);
      columnImage.push([]);
    }
    names.map((name) => {

      let file = `${path}/${name}`;
      let dimensions = sizeOf(file);
      let imageHeight = imageWidth / dimensions.width * dimensions.height;
      let index = columnHeight.indexOf(Math.min.apply(Math, columnHeight));
      columnHeight[index] += imageHeight;
      columnImage[index].push(name);
    });
    return (
      <div className={styles.list}
           ref="list"
      >

        {columnImage.map((images, index) =>
          <div
            key={index}
            className={styles.column+ ' col_'+ column}>
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

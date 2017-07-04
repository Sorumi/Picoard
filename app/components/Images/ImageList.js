import React, {Component} from 'react';
import sizeOf from 'image-size';
import styles from './ImageList.css';

class ImageList extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     lastIndex: 0,
  //   }
  // }
  render() {

    const {path, columnImages, imageWidth} = this.props;
    const column = columnImages.length;

    return (
      <div className={styles.list}
           onScroll={() => {
             console.log('!!!!');
           }}
      >

        {columnImages.map((images, index) =>
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

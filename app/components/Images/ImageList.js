import React from 'react';
import ImageItem from './ImageItem';

import styles from './ImageList.css';

function ImageList({path, columnImages, imageWidth, onClickImage}) {

  const column = columnImages.length;


  return (
    <div className={styles.list}>
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
                path={`${path}/${image}`}
                width={imageWidth}
                onClick={() => onClickImage(path, image)}
              /> : null
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageList;

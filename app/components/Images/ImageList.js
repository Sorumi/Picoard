import React from 'react';
import styles from './ImageList.css';

function ImageList({path, columnImages, imageWidth, onClickImage}) {

  const column = columnImages.length;


  return (
    <div className={styles.list}>
      {columnImages.map((images, index) =>
        <div
          key={index}
          className={styles.column + ' col_' + column}
        >
          {images.map(image =>

            <div
              key={image}
              className={styles.item}
            >
              <img
                src={`file://${path}/${image}`}
                draggable={false}
                width={imageWidth}
                onClick={() => onClickImage(`${path}/${image}`)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageList;

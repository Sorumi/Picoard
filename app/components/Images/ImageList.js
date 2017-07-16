import React from 'react';
import ImageItem from './ImageItem';

import styles from './ImageList.css';

function ImageList({path, columnImages, selectImages, imageWidth, onClickImage, onDoubleClickImage}) {

  const column = columnImages.length;


  function handleClickImage(onClick, onDoubleClick, delay) {
    let timeoutID = null;
    delay = delay || 250;

    return function (event) {
      event.stopPropagation();
      const metaKey = event.metaKey;
      if (!timeoutID) {
        timeoutID = setTimeout(() => {
          onClick(metaKey);
          timeoutID = null
        }, delay);
      } else {
        timeoutID = clearTimeout(timeoutID);
        console.log('d');
        onDoubleClick();
      }
    };

  }

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
                active={selectImages.indexOf(image) !== -1}
                path={`${path}/${image}`}
                width={imageWidth}
                onClick={handleClickImage(
                  (metaKey) => onClickImage(metaKey, image),
                  () => onDoubleClickImage(path, image)
                )}
              /> : null
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageList;

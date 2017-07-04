import React from 'react';
import styles from './ImageWrapper.css';

function ImageWrapper({path, width}) {

  return (
    <div className={styles.wrapper}>

      <img
        src={`file://${path}`}
        draggable={false}
        width={width}
      />

    </div>
  )
}

export default ImageWrapper;

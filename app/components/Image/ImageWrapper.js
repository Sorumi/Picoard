import React from 'react';
import styles from './ImageWrapper.css';

function ImageWrapper({path, width, marginTop}) {

  return (
    <div className={styles.wrapper}>

      <img
        src={`file://${path}`}
        draggable={false}
        width={width}
        style={{marginTop: marginTop}}
      />

    </div>
  )
}

export default ImageWrapper;

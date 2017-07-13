import React from 'react';
import ImageItem from '../Images/ImageItem';

import styles from './ImageWrapper.css';

function ImageWrapper({path, width, height, marginTop}) {

  return (
    <div className={styles.wrapper}
         style={{marginTop: marginTop}}>
      <ImageItem
        path={`${path}`}
        width={width}
        height={height}
        update={true}
      />
    </div>
  )
}

export default ImageWrapper;

import React from 'react';
import {connect} from 'react-redux'
import SizeSlider from '../Util/SizeSlider';
import os from 'os';

import styles from './ImagesTop.css';

function ImagesTop({directory, ratio, handleSliderSmall, handleSliderLarge, handleSliderChange}) {

  const userDir = os.homedir();
  const re = new RegExp(userDir + "\/(\\S+)$");
  const match = directory ? re.exec(directory.path) : false;
  let showPath = '';
  if (directory) {
    if (match) {
      showPath = '~/' + match[1]
    } else {
      showPath = directory.path
    }
  }

  return (
    <div className={styles.top}>
      <div className={styles.text_wrapper}>
        <h5>{directory ? directory.name : ''}</h5>
        <span>{showPath}</span>
      </div>
      <div className={styles.right}>
        <SizeSlider
          className={styles.slider}
          onChange={handleSliderChange}
          onClickSmall={handleSliderSmall}
          onClickLarge={handleSliderLarge}
          value={ratio * 100}
        />
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  const {ratio} = state.images;
  return {
    ratio
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSliderSmall: () => {
      dispatch({
        type: 'images/normalRatio',
        payload: 'small',
      })
    },
    handleSliderLarge: () => {
      dispatch({
        type: 'images/normalRatio',
        payload: 'large',
      })
    },
    handleSliderChange: (value) => {
      dispatch({
        type: 'images/changeRatio',
        payload: value / 100,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTop);

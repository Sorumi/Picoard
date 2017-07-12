import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import SizeSlider from '../Util/SizeSlider';


import styles from './ImageTop.css';

function ImageTop({ratio, handleBack, handleSliderSmall, handleSliderLarge, handleSliderChange}) {

  return (
    <div className={styles.top}>
      <div className={styles.text_wrapper}>
        <button
          onClick={handleBack}>
          <span className="iconfont icon-left"/>
        </button>
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
  const {ratio} = state.image;
  return {
    ratio
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleBack: () => {
      dispatch(push('/images'));
    },
    handleSliderSmall: () => {
      dispatch({
        type: 'image/normalRatio',
        payload: 'small',
      })
    },
    handleSliderLarge: () => {
      dispatch({
        type: 'image/normalRatio',
        payload: 'large',
      })
    },
    handleSliderChange: (value) => {
      dispatch({
        type: 'image/changeRatio',
        payload: value / 100,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTop);

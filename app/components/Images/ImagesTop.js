import React from 'react';
import {connect} from 'react-redux'
import SizeSlider from '../Util/SizeSlider';

import styles from './ImagesTop.css';

function ImagesTop({ratio, handleSliderChange}) {
    return (
        <div className={styles.top}>
            <div className={styles.text_wrapper}>
                <h5>Photo</h5>
                <span>~/DDD/DDD/DDD</span>
            </div>
            <div className={styles.right}>
                <SizeSlider
                  className={styles.slider}
                  onChange={handleSliderChange}
                  value={ratio*100}

                />
            </div>
        </div>
    )
}
function mapStateToProps(state) {
  const ratio = state.images;
  // const {size, sidebarWidth, offsetX} = state.window;
  return {
    ratio
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSliderChange: (value) => {
      dispatch({
        type: 'images/changeRatio',
        payload: value/100,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTop);

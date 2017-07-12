import React from 'react';
import {Slider} from 'antd';

import styles from './SizeSlider.css';

function SizeSlider({className, value, onChange, onClickSmall, onClickLarge}) {
  return (
    <div className={styles.size_slider + ' ' + className}>
      <div className={styles.icon + ' ' + styles.left}
           onClick={onClickSmall}>
        <span className="iconfont icon-small"/>
      </div>
      <div className={styles.slider_wrapper}>
        <Slider
          className={styles.slider}
          value={value}
          onChange={onChange}
          tipFormatter={null}
        />
      </div>

      <div className={styles.icon + ' ' + styles.right}
           onClick={onClickLarge}>
        <span className="iconfont icon-large"/>
      </div>
    </div>
  )
}

export default SizeSlider;

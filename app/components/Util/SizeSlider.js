import React from 'react';
import {Slider} from 'antd';

import styles from './SizeSlider.css';

function SizeSlider({className, defaultValue, onChange}) {
    return (
        <div className={styles.size_slider + ' ' + className}>
            <div className={styles.icon + ' ' + styles.left}>
                <span className="iconfont icon-small"/>
            </div>
            <div className={styles.slider_wrapper}>
                <Slider
                    className={styles.slider}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    // value={this.state.sliderValue}
                />
            </div>

            <div className={styles.icon + ' ' + styles.right}>
                <span className="iconfont icon-large"/>
            </div>
        </div>
    )
}

export default SizeSlider;

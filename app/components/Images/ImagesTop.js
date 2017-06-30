import React from 'react';
import SizeSlider from '../Util/SizeSlider';

import styles from './ImagesTop.css';

function ImagesTop() {
    return (
        <div className={styles.top}>
            <div className={styles.text_wrapper}>
                <h5>Photo</h5>
                <span>~/DDD/DDD/DDD</span>
            </div>
            <div className={styles.right}>
                <SizeSlider className={styles.slider}/>
            </div>
        </div>
    )
}

export default ImagesTop;
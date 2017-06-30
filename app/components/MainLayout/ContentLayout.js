/**
 * Created by Sorumi on 17/6/28.
 */
import React, {Component} from 'react';

import styles from './ContentLayout.css';

function ContentLayout({top, children}) {
    return(
        <div className={styles.layout}>
            <div className={styles.top}>
                {top}
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}

export default ContentLayout;